import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreatePantientDto {
    @ApiModelProperty()
    @IsString()
    readonly firstName: string;

    @ApiModelProperty()
    @IsString()
    readonly lastName: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(6)
    readonly postcode: string;

    @ApiModelProperty()
    @IsString()
    readonly street: string;

    @ApiModelProperty()
    @IsString()
    readonly city: string;

    @ApiModelProperty()
    @IsPhoneNumber("PL")
    readonly phone: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    readonly pesel: string;
}