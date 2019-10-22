import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Post } from './../posts/post.entity';
import { Comment } from './../comments/comment.entity';
import { ConfigService } from './../shared/config/config.service';
import { Doctor } from 'src/doctors/doctor.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Post, Comment, Doctor]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
