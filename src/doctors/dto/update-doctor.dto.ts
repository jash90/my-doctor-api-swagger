import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, IsEnum } from 'class-validator';
import { Specialist } from 'src/shared/enum/enums';

export class UpdateDoctorDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @Length(7)
    readonly numberPwz?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly firstName?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly lastName?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsEnum(Specialist)
    readonly specialization?: Specialist;
}