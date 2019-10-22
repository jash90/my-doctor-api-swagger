import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { ConfigService } from './../shared/config/config.service';
import { Doctor } from 'src/doctors/doctor.entity';
import { Pantient } from 'src/pantients/pantient.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Doctor, Pantient]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
