import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, MinLength, MaxLength, IsPhoneNumber, IsNumber, Min, Max, IsMilitaryTime } from 'class-validator';

export class UpdateScheduleDto {
    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly doctorId?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @ApiModelProperty()
    @Min(1)
    @Max(6)
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