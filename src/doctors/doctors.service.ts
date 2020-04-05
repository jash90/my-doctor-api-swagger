import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './doctor.entity';
import { DoctorDto } from './dto/doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorOffset } from './dto/doctor.offset';
import { Visit } from '../visits/visit.entity';
import { Schedule } from '../schedules/schedule.entity';
import { VisitDto } from '../visits/dto/visit.dto';
import { Pantient } from '../pantients/pantient.entity';

@Injectable()
export class DoctorsService {
    constructor(
        @Inject('DoctorsRepository')
        private readonly doctorsRepository: typeof Doctor,
    ) { }

    async findAll(): Promise<DoctorDto[]> {
        const doctors = await this.doctorsRepository.findAll<Doctor>({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        return doctors.map(doctor => {
            return new DoctorDto(doctor);
        });
    }

    async findOne(id: number): Promise<DoctorDto> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        if (!doctor) {
            throw new HttpException('No doctor found', HttpStatus.NOT_FOUND);
        }

        return new DoctorDto(doctor);
    }

    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = new Doctor();
        doctor.numberPwz = createDoctorDto.numberPwz;
        doctor.firstname = createDoctorDto.firstname;
        doctor.lastname = createDoctorDto.lastname;
        doctor.specialization = createDoctorDto.specialization;

        try {
            return await doctor.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getDoctor(id: number): Promise<Doctor> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        if (!doctor) {
            throw new HttpException('No doctor found', HttpStatus.NOT_FOUND);
        }

        return doctor;
    }

    async update(
        id: number,
        updateDoctorDto: UpdateDoctorDto,
    ): Promise<Doctor> {
        const doctor = await this.getDoctor(id);

        doctor.numberPwz = updateDoctorDto.numberPwz || doctor.numberPwz;
        doctor.firstname = updateDoctorDto.firstname || doctor.firstname;
        doctor.lastname = updateDoctorDto.lastname || doctor.lastname;
        doctor.specialization = updateDoctorDto.specialization || doctor.specialization;

        try {
            return await doctor.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Doctor> {
        const doctor = await this.getDoctor(id);
        await doctor.destroy();
        return doctor;
    }

    async offset(index: number = 0): Promise<DoctorOffset> {
        const doctors = await this.doctorsRepository.findAndCountAll({
            include: [Visit, Schedule],
            limit: 100,
            offset: index * 100,
            order: ['id'],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });

        const DoctorsDto = doctors.rows.map(doctor => {
            return new DoctorDto(doctor);
        });

        return { rows: DoctorsDto, count: doctors.count };
    }

    async doctorVisits(id: number): Promise<VisitDto[]> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id, {
            include: [{ model: Visit, include: [Doctor, Pantient] }],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });
        return doctor.visits.map(visit => {
            return new VisitDto(visit);
        });
    }
}
