import { ApiModelProperty } from '@nestjs/swagger';
import { IsMilitaryTime, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateScheduleDto {
    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly doctorId?: number;

    @ApiModelProperty()
    @Min(1)
    @Max(7)
    @IsOptional()
    readonly dayOfWeek?: number;

    @ApiModelProperty()
    @IsMilitaryTime()
    @IsOptional()
    readonly hourOpen?: string;

    @ApiModelProperty()
    @IsMilitaryTime()
    @IsOptional()
    readonly hourClose?: string;

}
