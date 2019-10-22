import { ApiModelProperty } from '@nestjs/swagger';
import { Schedule } from '../schedule.entity';

export class ScheduleDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly doctorId: number;

    @ApiModelProperty()
    readonly doctorFirstName: string;

    @ApiModelProperty()
    readonly doctorLastName: string;

    @ApiModelProperty()
    readonly dayOfWeek: number;

    @ApiModelProperty()
    readonly hourOpen: string;

    @ApiModelProperty()
    readonly hourClose: string;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(schedule: Schedule) {
        this.id = schedule.id;
        this.doctorId = schedule.doctorId;
        this.doctorFirstName = schedule.doctor.firstName;
        this.doctorLastName = schedule.doctor.lastName;
        this.dayOfWeek = schedule.dayOfWeek;
        this.hourOpen = schedule.hourOpen;
        this.hourClose = schedule.hourClose;
        this.createdAt = schedule.createdAt;
        this.updatedAt = schedule.updatedAt;
    }
}
