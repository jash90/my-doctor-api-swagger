import { User } from '../users/user.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @Inject('CommentsRepository')
        private readonly commentsRepository: typeof Comment,
    ) {}

    async findAll(): Promise<CommentDto[]> {
        const comments = await this.commentsRepository.findAll<Comment>({
            include: [User],
        });
        return comments.map(comment => {
            return new CommentDto(comment);
        });
    }

    async findOne(id: number): Promise<CommentDto> {
        const comment = await this.commentsRepository.findByPk<Comment>(id, {
            include: [User],
        });
        if (!comment) {
            throw new HttpException('No comment found', HttpStatus.NOT_FOUND);
        }

        return new CommentDto(comment);
    }

    async create(userId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = new Comment();
        comment.userId = userId;
        comment.title = createCommentDto.title;
        comment.content = createCommentDto.content;

        try {
            return await comment.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getUserComment(id: number, userId: string): Promise<Comment> {
        const comment = await this.commentsRepository.findByPk<Comment>(id);
        if (!comment) {
            throw new HttpException('No comment found', HttpStatus.NOT_FOUND);
        }

        if (comment.userId !== userId) {
            throw new HttpException(
                'You are unauthorized to manage this comment',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return comment;
    }

    async update(
        id: number,
        userId: string,
        updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        const comment = await this.getUserComment(id, userId);

        comment.title = updateCommentDto.title || comment.title;
        comment.content = updateCommentDto.content || comment.content;

        try {
            return await comment.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number, userId: string): Promise<Comment> {
        const comment = await this.getUserComment(id, userId);
        await comment.destroy();
        return comment;
    }
}
