import { ApiModelProperty } from '@nestjs/swagger';
import { Pantient } from '../pantient.entity';
import { PantientDto } from 'src/pantients/dto/pantient.dto';

export class PantientOffset {
    @ApiModelProperty()
    readonly rows: PantientDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(pantientOffset: PantientOffset) {
       this.rows = pantientOffset.rows;
       this.count = pantientOffset.count;
    }
}
