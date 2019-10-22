import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Length, IsEnum } from 'class-validator';
import { Specialist } from 'src/shared/enum/enums';
import { Doctor } from '../doctor.entity';

export class DoctorDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    @IsString()
    @Length(7)
    readonly numberPwz: string;

    @ApiModelProperty()
    @IsString()
    readonly firstName: string;

    @ApiModelProperty()
    @IsString()
    readonly lastName: string;

    @ApiModelProperty()
    @IsEnum(Specialist)
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
