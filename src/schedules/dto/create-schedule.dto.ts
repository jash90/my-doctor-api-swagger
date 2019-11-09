import { ApiModelProperty } from '@nestjs/swagger';
import { IsMilitaryTime, IsNumber, Max, Min } from 'class-validator';

export class CreateScheduleDto {
    @ApiModelProperty()
    @IsNumber()
    readonly doctorId: number;

    @ApiModelProperty()
    @Min(1)
    @Max(7)
    readonly dayOfWeek: number;

    @ApiModelProperty()
    @IsMilitaryTime()
    readonly hourOpen: string;

    @ApiModelProperty()
    @IsMilitaryTime()
    readonly hourClose: string;
}
