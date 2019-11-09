import { ApiModelProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVisitDto {
    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly doctorId?: number;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly pantientId?: number;

    @ApiModelProperty()
    @IsISO8601()
    @IsOptional()
    readonly date?: Date;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly description?: string;

}
