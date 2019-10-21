import { Comment } from './comment.entity';

export const commentsProviders = [{ provide: 'CommentsRepository', useValue: Comment }];
