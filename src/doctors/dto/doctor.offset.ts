import { ApiModelProperty } from '@nestjs/swagger';
import { DoctorDto } from './doctor.dto';

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
