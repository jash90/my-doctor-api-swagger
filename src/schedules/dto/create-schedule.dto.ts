import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsPhoneNumber, IsMilitaryTime, Max, Min, IsNumber, } from 'class-validator';

export class CreateScheduleDto {
    @ApiModelProperty()
    @IsNumber()
    readonly doctorId: number;

    @ApiModelProperty()
    @IsString()
    readonly lastName: string;

    @ApiModelProperty()
    @Min(1)
    @Max(6)
    readonly dayOfWeek: number;

    @ApiModelProperty()
    @IsMilitaryTime()
    readonly hourOpen: string;

    @ApiModelProperty()
    @IsMilitaryTime()
    readonly hourClose: string;
}