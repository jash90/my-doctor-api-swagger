import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Length, IsEnum, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';
import { Pantient } from '../pantient.entity';

export class PantientDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    @IsString()
    readonly firstName: string;

    @ApiModelProperty()
    @IsString()
    readonly lastName: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(7)
    @MaxLength(7)
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

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(pantient: Pantient) {
        this.id = pantient.id;
        this.firstName = pantient.firstName;
        this.lastName = pantient.lastName;
        this.postcode = pantient.postcode;
        this.street = pantient.street;
        this.city = pantient.city;
        this.phone = pantient.phone;
        this.pesel = pantient.pesel;
        this.createdAt = pantient.createdAt;
        this.updatedAt = pantient.updatedAt;
    }
}
