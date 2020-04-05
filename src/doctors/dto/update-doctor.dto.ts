import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Specialist } from '../../shared/enum/enums';

export class UpdateDoctorDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @Length(7)
    readonly numberPwz?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly firstname?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsString()
    readonly lastname?: string;

    @IsOptional()
    @ApiModelProperty()
    @IsEnum(Specialist)
    readonly specialization?: Specialist;
}
