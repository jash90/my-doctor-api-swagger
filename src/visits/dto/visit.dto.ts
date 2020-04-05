import { ApiModelProperty } from '@nestjs/swagger';
import { Visit } from '../visit.entity';

export class VisitDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly doctorId: number;

    @ApiModelProperty()
    readonly doctorfirstname: string;

    @ApiModelProperty()
    readonly doctorLastname: string;

    @ApiModelProperty()
    readonly pantientId: number;

    @ApiModelProperty()
    readonly pantientfirstname: string;

    @ApiModelProperty()
    readonly pantientLastname: string;

    @ApiModelProperty()
    readonly date: Date;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(visit: Visit) {
        this.id = visit.id;
        this.doctorId = visit.doctorId;
        this.doctorfirstname = visit.doctor.firstname;
        this.doctorLastname = visit.doctor.lastname;
        this.pantientId = visit.pantientId;
        this.pantientfirstname = visit.pantient.firstname;
        this.pantientLastname = visit.pantient.lastname;
        this.date = visit.date;
        this.description = visit.description;
        this.createdAt = visit.createdAt;
        this.updatedAt = visit.updatedAt;
    }
}
