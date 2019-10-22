import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './doctor.entity';
import { DoctorDto } from './dto/doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
    constructor(
        @Inject('DoctorsRepository')
        private readonly doctorsRepository: typeof Doctor,
    ) {}

    async findAll(): Promise<DoctorDto[]> {
        const doctors = await this.doctorsRepository.findAll<Doctor>({
        });
        return doctors.map(doctor => {
            return new DoctorDto(doctor);
        });
    }

    async findOne(id: number): Promise<DoctorDto> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id, {
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

    private async getDoctor(id: number): Promise<Doctor> {
        const doctor = await this.doctorsRepository.findByPk<Doctor>(id);
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
        doctor.firstName = updateDoctorDto.firstName || doctor.firstName;
        doctor.lastName = updateDoctorDto.lastName || doctor.lastName;
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
}
