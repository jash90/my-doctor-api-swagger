import { ApiModelProperty } from '@nestjs/swagger';
import { Visit } from '../visit.entity';

export class VisitDto {
    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly doctorId: string;

    @ApiModelProperty()
    readonly doctorFirstName: string;

    @ApiModelProperty()
    readonly doctorLastName: string;

    @ApiModelProperty()
    readonly pantientId: string;

    @ApiModelProperty()
    readonly pantientFirstName: string;

    @ApiModelProperty()
    readonly pantientLastName: string;

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
        this.doctorFirstName = visit.doctor.firstName;
        this.doctorLastName = visit.doctor.lastName;
        this.pantientId = visit.pantientId;
        this.pantientFirstName = visit.pantient.firstName;
        this.pantientLastName = visit.pantient.lastName;
        this.date = visit.date;
        this.description = visit.description;
        this.createdAt = visit.createdAt;
        this.updatedAt = visit.updatedAt;
    }
}
