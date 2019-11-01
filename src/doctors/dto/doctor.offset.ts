import { ApiModelProperty } from '@nestjs/swagger';
import { Doctor } from '../doctor.entity';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';

export class DoctorOffset {
    @ApiModelProperty()
    readonly rows: DoctorDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(doctorOffset: DoctorOffset) {
       this.rows = doctorOffset.rows;
       this.count = doctorOffset.count;
    }
}
