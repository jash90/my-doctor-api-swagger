import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsPhoneNumber, IsMilitaryTime, Max, Min, IsNumber, IsDate, } from 'class-validator';

export class CreateVisitDto {
    @ApiModelProperty()
    @IsNumber()
    readonly doctorId: number;

    @ApiModelProperty()
    @IsNumber()
    readonly pantientId: number;

    @ApiModelProperty()
    @IsDate()
    readonly date: Date;

    @ApiModelProperty()
    @IsString()
    readonly description: string;
}