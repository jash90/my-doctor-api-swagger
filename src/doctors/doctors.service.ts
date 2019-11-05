import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './doctor.entity';
import { DoctorDto } from './dto/doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorOffset } from './dto/doctor.offset';
import { Visit } from '../visits/visit.entity';
import { Schedule } from '../schedules/schedule.entity';

@Injectable()
export class DoctorsService {
    constructor(
        @Inject('DoctorsRepository')
        private readonly doctorsRepository: typeof Doctor,
    ) { }

    async findAll(): Promise<DoctorDto[]> {
        const doctors = await this.doctorsRepository.findAll<Doctor>({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        return doctors.map(doctor => {
            return new DoctorDto(doctor);
        });
    }

    async findOne(id: string): Promise<DoctorDto> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        if (!doctor) {
            throw new HttpException('No doctor found', HttpStatus.NOT_FOUND);
        }

        return new DoctorDto(doctor);
    }

    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = new Doctor();
        doctor.numberPwz = createDoctorDto.numberPwz;
        doctor.firstName = createDoctorDto.firstName;
        doctor.lastName = createDoctorDto.lastName;
        doctor.specialization = createDoctorDto.specialization;

        try {
            return await doctor.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getDoctor(id: string): Promise<Doctor> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        if (!doctor) {
            throw new HttpException('No doctor found', HttpStatus.NOT_FOUND);
        }

        return doctor;
    }

    async update(
        id: string,
        updateDoctorDto: UpdateDoctorDto,
    ): Promise<Doctor> {
        const doctor = await this.getDoctor(id);

        doctor.numberPwz = updateDoctorDto.numberPwz || doctor.numberPwz;
        doctor.firstName = updateDoctorDto.firstName || doctor.firstName;
        doctor.lastName = updateDoctorDto.lastName || doctor.lastName;
        doctor.specialization = updateDoctorDto.specialization || doctor.specialization;

        try {
            return await doctor.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<Doctor> {
        const doctor = await this.getDoctor(id);
        await doctor.destroy();
        return doctor;
    }

    async offset(index: number = 0): Promise<DoctorOffset> {
        let doctors = await this.doctorsRepository.findAndCountAll({
            include: [Visit, Schedule],
            limit: 100,
            offset: index * 100,
            order: ['id'],
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });

        let DoctorsDto = doctors.rows.map(doctor => {
            return new DoctorsDto(doctor);
        })

        return { rows: DoctorsDto, count: doctors.count };
    }
}
