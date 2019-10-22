import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Length, IsEnum, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';
import { Pantient } from '../pantient.entity';

export class PantientDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly firstName: string;

    @ApiModelProperty()
    readonly lastName: string;

    @ApiModelProperty()
    readonly postcode: string;

    @ApiModelProperty()
    readonly street: string;

    @ApiModelProperty()
    readonly city: string;

    @ApiModelProperty()
    readonly phone: string;

    @ApiModelProperty()
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
