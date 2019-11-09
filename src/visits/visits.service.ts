import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './visit.entity';
import { VisitDto } from './dto/visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { LocalDateTime, LocalTime, nativeJs } from 'js-joda';
import { Doctor } from '../doctors/doctor.entity';
import { Pantient } from '../pantients/pantient.entity';
import { VisitOffset } from './dto/visit.offset';
import { Schedule } from '../schedules/schedule.entity';

@Injectable()
export class VisitsService {
    constructor(
        @Inject('VisitsRepository')
        private readonly visitsRepository: typeof Visit,
        @Inject('SchedulesRepository')
        private readonly schedulesRepository: typeof Schedule,
        @Inject('DoctorsRepository')
        private readonly doctorsRepository: typeof Doctor,
        @Inject('PantientsRepository')
        private readonly pantientsRepository: typeof Pantient,
    ) {
    }

    async findAll(): Promise<VisitDto[]> {
        const visits = await this.visitsRepository.findAll<Visit>({
            include: [Doctor, Pantient],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        return visits.map(visit => {
            return new VisitDto(visit);
        });
    }

    async findOne(id: number): Promise<VisitDto> {
        const visit = await this.visitsRepository.findByPk<Visit>(id, {
            include: [Doctor, Pantient],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        if (!visit) {
            throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
        }

        return new VisitDto(visit);
    }

    async create(createVisitDto: CreateVisitDto): Promise<Visit> {
        const { doctorId, pantientId, date, description } = createVisitDto;

        const visit = new Visit();
        visit.doctorId = doctorId;
        visit.pantientId = pantientId;
        visit.date = new Date(date);
        visit.description = description;

        const doctor = await this.doctorsRepository.findByPk(doctorId);

        if (!doctor) {
            throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
        }

        const pantient = await this.pantientsRepository.findByPk(pantientId);

        if (!pantient) {
            throw new HttpException('Pantient not found', HttpStatus.NOT_FOUND);
        }

        const visitDay = LocalDateTime.from(nativeJs(new Date(date)));

        const dateVisit = await this.dateVisits(new Date(visitDay.toString()));

        if (dateVisit) {
            throw new HttpException('Wizyta w danym terminie istnieje.', HttpStatus.CONFLICT);
        }

        const schedules = await this.schedulesRepository.findAll({
            where: { doctorId },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });

        if (schedules.length === 0) {
            throw new HttpException('Doktor nie ma harmonogramu przyjeć.', HttpStatus.NOT_FOUND);
        }

        const schedule = schedules.find(s => s.dayOfWeek === visitDay.dayOfWeek().value());
        if (schedule) {
            const hourOpen = LocalTime.parse(schedule.hourOpen);
            const hourClose = LocalTime.parse(schedule.hourClose);
            if ((!hourOpen.equals(visitDay.toLocalTime()) && !hourClose.equals(visitDay.toLocalTime()))
                && !(hourOpen.isBefore(visitDay.toLocalTime()) && hourClose.isAfter(visitDay.toLocalTime()))) {
                throw new HttpException('Doctor nie przyjmuje o danej godzinie.', HttpStatus.CONFLICT);
            }
        } else {
            throw new HttpException('Doctor nie przyjmuje danego dnia.', HttpStatus.CONFLICT);
        }

        try {
            return await visit.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getVisit(id: number): Promise<Visit> {
        const visit = await this.visitsRepository.findByPk<Visit>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        if (!visit) {
            throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
        }

        return visit;
    }

    async update(
        id: number,
        updateVisitDto: UpdateVisitDto,
    ): Promise<Visit> {
        const visit = await this.getVisit(id);
        visit.doctorId = updateVisitDto.doctorId || visit.doctorId;
        visit.pantientId = updateVisitDto.pantientId || visit.pantientId;
        visit.date = updateVisitDto.date || visit.date;
        visit.description = updateVisitDto.description || visit.description;

        try {
            return await visit.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Visit> {
        const visit = await this.getVisit(id);
        await visit.destroy();
        return visit;
    }

    async offset(index: number = 0): Promise<VisitOffset> {
        const visits = await this.visitsRepository.findAndCountAll({
            include: [Doctor, Pantient],
            limit: 100,
            offset: index * 100,
            order: ['id'],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });

        const visitsDto = visits.rows.map(visit => {
            return new VisitDto(visit);
        });

        return { rows: visitsDto, count: visits.count };
    }

    async freeVisit(doctorId: number): Promise<string[]> {
        const freeDay: string[] = [];
        const schedules = await this.schedulesRepository.findAll({
            where: {
                doctorId,
            },
        });
        let morning = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);
        while (freeDay.length < 13) {
            const schedule = schedules.find((s) => s.dayOfWeek === morning.dayOfWeek().value());

            if (schedule) {
                const hourOpen = Number(schedule.hourOpen.replace(':00:00', ''));
                const hourClose = Number(schedule.hourClose.replace(':00:00', ''));
                for (let index = hourOpen; index < hourClose; index++) {
                    morning = morning.withHour(index);
                    const visit = await Visit.findOne({
                        where: {
                            doctorId,
                            date: morning.toString(),
                        },
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    });
                    if (!visit) {
                        freeDay.push(morning.toString());
                    }
                }
            }
            morning = morning.plusDays(1);
        }
        return freeDay;
    }

    async search(doctorId: number): Promise<VisitDto[]> {
        const now = LocalDateTime.now().toLocalDate().toString();
        const next10 = LocalDateTime.now().plusDays(100).toString();

        const visits = await this.visitsRepository.findAll({
            where: {
                doctorId,
                date: {
                    $between: [new Date(now), new Date(next10)],
                },
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        if (!visits) {
            throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
        }

        return visits.map(visit => {
            return new VisitDto(visit);
        });
    }

    async dateVisits(date: Date): Promise<Visit | null> {
        return await this.visitsRepository.findOne<Visit>({
            where: { date },
            include: [Doctor, Pantient],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
    }
}
