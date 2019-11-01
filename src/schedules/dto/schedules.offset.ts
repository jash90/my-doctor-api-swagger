import { ApiModelProperty } from '@nestjs/swagger';
import { Schedule } from '../schedule.entity';
import { ScheduleDto } from '../dto/schedule.dto';

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
