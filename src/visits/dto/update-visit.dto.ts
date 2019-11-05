import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, MinLength, MaxLength, IsPhoneNumber, IsNumber, Min, Max, IsDate, IsISO8601 } from 'class-validator';

export class UpdateVisitDto {
    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly doctorId?: string;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly pantientId?: string;

    @ApiModelProperty()
    @IsISO8601()
    @IsOptional()
    readonly date?: Date;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly description?: string;

}