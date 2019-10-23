import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, MinLength, MaxLength, IsPhoneNumber, IsNumber, Min, Max, IsDate } from 'class-validator';

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
    @IsDate()
    @IsOptional()
    readonly date?: Date;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly description?: string;

}