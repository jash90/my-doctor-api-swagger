import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePantientDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstname: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(6)
    readonly postcode: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly street: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @ApiModelProperty()
    @IsPhoneNumber('PL')
    @IsNotEmpty()
    readonly phone: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    @IsNotEmpty()
    readonly pesel: string;
}
