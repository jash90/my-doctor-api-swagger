import { ApiModelProperty } from '@nestjs/swagger';
import { Specialist } from '../../shared/enum/enums';
import { Doctor } from '../doctor.entity';

export class DoctorDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly numberPwz: string;

    @ApiModelProperty()
    readonly firstname: string;

    @ApiModelProperty()
    readonly lastname: string;

    @ApiModelProperty()
    readonly specialization: Specialist;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(doctor: Doctor) {
        this.id = doctor.id;
        this.numberPwz = doctor.numberPwz;
        this.firstname = doctor.firstname;
        this.lastname = doctor.lastname;
        this.specialization = doctor.specialization;
        this.createdAt = doctor.createdAt;
        this.updatedAt = doctor.updatedAt;
    }
}
