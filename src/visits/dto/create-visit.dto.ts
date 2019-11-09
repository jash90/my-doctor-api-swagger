import { ApiModelProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsString } from 'class-validator';

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
