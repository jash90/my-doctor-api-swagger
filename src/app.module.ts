import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
    imports: [UsersModule, PostsModule, SharedModule, CommentsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
