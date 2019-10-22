import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { schedulesProviders } from './schedules.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [SchedulesController],
    providers: [SchedulesService, ...schedulesProviders],
    exports: [],
})
export class SchedulesModule {}
