import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { Specialist } from '../../shared/enum/enums';

export class CreateDoctorDto {
    @ApiModelProperty()
    @IsString()
    @Length(7)
    readonly numberPwz: string;

    @ApiModelProperty()
    @IsString()
    readonly firstName: string;

    @ApiModelProperty()
    @IsString()
    readonly lastName: string;

    @ApiModelProperty()
    @IsEnum(Specialist)
    readonly specialization: Specialist;
}
