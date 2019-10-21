import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { Comment as CommentEntity } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { Request } from 'express';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@ApiUseTags('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    @ApiOkResponse({ type: [CommentDto] })
    findAll(): Promise<CommentDto[]> {
        return this.commentsService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CommentDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<CommentDto> {
        return this.commentsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: CommentEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createCommentDto: CreateCommentDto,
        @Req() request,
    ): Promise<CommentEntity> {
        return this.commentsService.create(request.user.id, createCommentDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: CommentEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<CommentEntity> {
        return this.commentsService.update(id, request.user.id, updateCommentDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CommentEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
    ): Promise<CommentEntity> {
        return this.commentsService.delete(id, request.user.id);
    }
}
