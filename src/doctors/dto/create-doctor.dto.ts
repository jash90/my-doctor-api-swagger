import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsEnum } from 'class-validator';
import { Specialist } from 'src/shared/enum/enums';

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