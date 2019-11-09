import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './schedule.entity';
import { ScheduleDto } from './dto/schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleOffset } from './dto/schedules.offset';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class SchedulesService {
    constructor(
        @Inject('SchedulesRepository')
        private readonly schedulesRepository: typeof Schedule,
        @Inject('DoctorsRepository')
        private readonly doctorsRepository: typeof Doctor,
        ) { }

    async findAll(): Promise<ScheduleDto[]> {
        const schedules = await this.schedulesRepository.findAll<Schedule>({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        return schedules.map(schedule => {
            return new ScheduleDto(schedule);
        });
    }

    async findOne(id: number): Promise<ScheduleDto> {
        const schedule = await this.schedulesRepository.findByPk<Schedule>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        if (!schedule) {
            throw new HttpException('No schedule found', HttpStatus.NOT_FOUND);
        }

        return new ScheduleDto(schedule);
    }

    async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
        const schedule = new Schedule();
        schedule.doctorId = createScheduleDto.doctorId;
        schedule.dayOfWeek = createScheduleDto.dayOfWeek;
        schedule.hourOpen = createScheduleDto.hourOpen;
        schedule.hourClose = createScheduleDto.hourClose;

        const doctor = await this.doctorsRepository.findByPk(createScheduleDto.doctorId);

        if (!doctor) {
            throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
        }

        try {
            return await schedule.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getSchedule(id: number): Promise<Schedule> {
        const schedule = await this.schedulesRepository.findByPk<Schedule>(id);
        if (!schedule) {
            throw new HttpException('No schedule found', HttpStatus.NOT_FOUND);
        }

        return schedule;
    }

    async update(
        id: number,
        updateScheduleDto: UpdateScheduleDto,
    ): Promise<Schedule> {
        const schedule = await this.getSchedule(id);
        schedule.doctorId = updateScheduleDto.doctorId || schedule.doctorId;
        schedule.dayOfWeek = updateScheduleDto.dayOfWeek || schedule.dayOfWeek;
        schedule.hourOpen = updateScheduleDto.hourOpen || schedule.hourOpen;
        schedule.hourClose = updateScheduleDto.hourClose || schedule.hourClose;

        const doctor = this.doctorsRepository.findByPk(id);

        if (!doctor) {
            throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
        }

        try {
            return await schedule.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Schedule> {
        const schedule = await this.getSchedule(id);
        await schedule.destroy();
        return schedule;
    }

    async search(doctorId: number): Promise<ScheduleDto[]> {
        const schedules = await this.schedulesRepository.findAll({
            where: {
                doctorId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            order: ['dayOfWeek'],
        });

        return schedules.map(schedule => {
            return new ScheduleDto(schedule);
        });
    }

    async offset(index: number = 0): Promise<ScheduleOffset> {
        const schedules = await this.schedulesRepository.findAndCountAll({
            include: [Doctor],
            limit: 100,
            offset: index * 100,
            order: ['id'],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });

        const SchedulesDto = schedules.rows.map(schedule => {
            return new ScheduleDto(schedule);
        });

        return { rows: SchedulesDto, count: schedules.count };
    }
}
