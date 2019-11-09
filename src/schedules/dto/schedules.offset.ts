import { ApiModelProperty } from '@nestjs/swagger';
import { ScheduleDto } from './schedule.dto';

export class ScheduleOffset {
    @ApiModelProperty()
    readonly rows: ScheduleDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(scheduleOffset: ScheduleOffset) {
       this.rows = scheduleOffset.rows;
       this.count = scheduleOffset.count;
    }
}
