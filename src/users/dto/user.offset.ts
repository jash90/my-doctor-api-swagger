import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { UserDto } from 'src/users/dto/user.dto';

export class UserOffset {
    @ApiModelProperty()
    readonly rows: UserDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(userOffset: UserOffset) {
       this.rows = userOffset.rows;
       this.count = userOffset.count;
    }
}