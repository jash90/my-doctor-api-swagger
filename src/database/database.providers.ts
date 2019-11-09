import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { ConfigService } from './../shared/config/config.service';
import { Doctor } from '../doctors/doctor.entity';
import { Pantient } from '../pantients/pantient.entity';
import { Schedule } from '../schedules/schedule.entity';
import { Visit } from '../visits/visit.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Doctor, Pantient, Schedule, Visit]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
