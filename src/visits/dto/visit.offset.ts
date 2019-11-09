import { ApiModelProperty } from '@nestjs/swagger';
import { VisitDto } from './visit.dto';

export class VisitOffset {
    @ApiModelProperty()
    readonly rows: VisitDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(visitOffset: VisitOffset) {
       this.rows = visitOffset.rows;
       this.count = visitOffset.count;
    }
}
