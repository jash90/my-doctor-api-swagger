import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsPhoneNumber, IsMilitaryTime, Max, Min, IsNumber, IsDate,IsISO8601 } from 'class-validator';

export class CreateVisitDto {
    @ApiModelProperty()
    @IsNumber()
    readonly doctorId: number;

    @ApiModelProperty()
    @IsNumber()
    readonly pantientId: number;

    @ApiModelProperty()
    @IsISO8601()
    readonly date: Date;

    @ApiModelProperty()
    @IsString()
    readonly description: string;
}