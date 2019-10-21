import { ApiModelProperty } from '@nestjs/swagger';
import { Comment } from '../comment.entity';

export class CommentDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly authorId: string;

    @ApiModelProperty()
    readonly authorFirstName: string;

    @ApiModelProperty()
    readonly authorLastName: string;

    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly content: string;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(comment: Comment) {
        this.id = comment.id;
        this.authorId = comment.userId;
        this.authorFirstName = comment.user.firstName;
        this.authorLastName = comment.user.lastName;
        this.title = comment.title;
        this.content = comment.content;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
    }
}
