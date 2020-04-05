import { ApiModelProperty } from '@nestjs/swagger';
import { Pantient } from '../pantient.entity';

export class PantientDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly firstname: string;

    @ApiModelProperty()
    readonly lastname: string;

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
        this.firstname = pantient.firstname;
        this.lastname = pantient.lastname;
        this.postcode = pantient.postcode;
        this.street = pantient.street;
        this.city = pantient.city;
        this.phone = pantient.phone;
        this.pesel = pantient.pesel;
        this.createdAt = pantient.createdAt;
        this.updatedAt = pantient.updatedAt;
    }
}
