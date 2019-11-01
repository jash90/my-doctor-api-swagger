import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './visit.entity';
import { VisitDto } from './dto/visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { DateTimeFormatter, LocalDateTime } from 'js-joda';
import { Op } from 'sequelize';
import { Doctor } from 'src/doctors/doctor.entity';
import { Pantient } from 'src/pantients/pantient.entity';
import { VisitOffset } from 'src/visits/dto/visit.offset';
import { Schedule } from 'src/schedules/schedule.entity';

@Injectable()
export class VisitsService {
    constructor(
        @Inject('VisitsRepository')
        private readonly visitsRepository: typeof Visit,
        @Inject('SchedulesRepository')
        private readonly schedulesRepository: typeof Schedule,
    ) { }

    async findAll(): Promise<VisitDto[]> {
        const visits = await this.visitsRepository.findAll<Visit>({
            include: [Doctor, Pantient]
        });
        return visits.map(visit => {
            return new VisitDto(visit);
        });
    }

    async findOne(id: number): Promise<VisitDto> {
        const visit = await this.visitsRepository.findByPk<Visit>(id, {
            include: [Doctor, Pantient]
        });
        if (!visit) {
            throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
        }

        return new VisitDto(visit);
    }

    async create(createVisitDto: CreateVisitDto): Promise<Visit> {
        const visit = new Visit();
        visit.doctorId = createVisitDto.doctorId;
        visit.pantientId = createVisitDto.pantientId;
        visit.date = createVisitDto.date;
        visit.description = createVisitDto.description;

        try {
            return await visit.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getVisit(id: number): Promise<Visit> {
        const visit = await this.visitsRepository.findByPk<Visit>(id);
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
        let visits = await this.visitsRepository.findAndCountAll({
            include: [Doctor, Pantient],
            limit: 100,
            offset: index * 100,
            order: ['id']
        });

        let visitsDto = visits.rows.map(visit => {
            return new VisitDto(visit);
        })

        return { rows: visitsDto, count: visits.count };
    }

    async freeVisit(doctorId: number): Promise<String[]> {
        let freeDay:String[] = [];
        let schedules = await this.schedulesRepository.findAll({
            where: {
                doctorId
            }
        });
        let now = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);

        for (let index = 0; index < 14; index++) {
            const schedule = schedules.find((schedule) => schedule.dayOfWeek === now.dayOfWeek().value());
            let morning = now;
            if (schedule) {
                const hourOpen = Number(schedule.hourOpen.replace(":00:00", ""));
                const hourClose = Number(schedule.hourClose.replace(":00:00", ""));
                for (let index = hourOpen; index < hourClose; index++) {
                    morning = now.withHour(index);
                    let visit = await Visit.findOne({
                        where: {
                            doctorId,
                            date: morning.toString()
                        }
                    });
                    if (!visit) {
                        freeDay.push(morning.toString());
                    }
                }
            }
            morning = morning.withHour(24);
        }
        return freeDay;

    }

    // async search(id: number): Promise<VisitDto[]> {
    //     const dt = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm');
    //     const now = LocalDateTime.now().toLocalDate();
    //     const next10 = LocalDateTime.now().plusDays(100);

    //     const visits = await this.visitsRepository.findAll<Visit>({
    //         where: {
            
           
    //          date: { [Op.gte]: new Date}

            
    //         }
    //     });
    //     if (!visits) {
    //         throw new HttpException('No visit found', HttpStatus.NOT_FOUND);
    //     }

    //     return visits;
    //     // .map(visit => {
    //     //     return new VisitDto(visit);
    //     // });
    // }
}
