import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { commentsProviders } from './comments.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CommentsController],
    providers: [CommentsService, ...commentsProviders],
    exports: [],
})
export class CommentsModule {}
