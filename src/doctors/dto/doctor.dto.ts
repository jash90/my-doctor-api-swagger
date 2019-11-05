import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Length, IsEnum } from 'class-validator';
import { Specialist } from '../../shared/enum/enums';
import { Doctor } from '../doctor.entity';

export class DoctorDto {
    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly numberPwz: string;

    @ApiModelProperty()
    readonly firstName: string;

    @ApiModelProperty()
    readonly lastName: string;

    @ApiModelProperty()
    readonly specialization: Specialist;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(doctor: Doctor) {
        this.id = doctor.id;
        this.numberPwz = doctor.numberPwz;
        this.firstName = doctor.firstName;
        this.lastName = doctor.lastName;
        this.specialization = doctor.specialization;
        this.createdAt = doctor.createdAt;
        this.updatedAt = doctor.updatedAt;
    }
}
