import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { ConfigService } from './../shared/config/config.service';
import { Doctor } from 'src/doctors/doctor.entity';
import { Pantient } from 'src/pantients/pantient.entity';
import { Schedule } from 'src/schedules/schedule.entity';
import { Visit } from 'src/visits/visit.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Doctor, Pantient, Schedule,Visit]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
