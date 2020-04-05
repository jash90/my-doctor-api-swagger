import {
    IsString,
    IsEmail,
    IsEnum,
    IsISO8601,
    IsOptional,
    MinLength,
} from 'class-validator';
import { Gender } from '../../shared/enum/enums';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiModelProperty()
    @IsString()
    readonly firstname: string;

    @ApiModelProperty()
    @IsString()
    readonly lastname: string;

    @ApiModelProperty()
    @IsOptional()
    @IsEnum(Gender)
    readonly gender: Gender;

    @ApiModelProperty()
    @IsOptional()
    @IsISO8601()
    readonly birthday: string;
}
