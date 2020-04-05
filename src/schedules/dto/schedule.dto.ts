import { ApiModelProperty } from '@nestjs/swagger';
import { Schedule } from '../schedule.entity';

export class ScheduleDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly doctorId: number;

    @ApiModelProperty()
    readonly doctorFirstname: string;

    @ApiModelProperty()
    readonly doctorLastname: string;

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
        this.doctorFirstname = schedule.doctor.firstname;
        this.doctorLastname = schedule.doctor.lastname;
        this.dayOfWeek = schedule.dayOfWeek;
        this.hourOpen = schedule.hourOpen;
        this.hourClose = schedule.hourClose;
        this.createdAt = schedule.createdAt;
        this.updatedAt = schedule.updatedAt;
    }
}
