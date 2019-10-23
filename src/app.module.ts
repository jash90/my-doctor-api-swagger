import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PantientsModule } from './pantients/pantients.module';
import { SchedulesModule } from './schedules/schedules.module';
import { VisitsModule } from './visits/visits.module';

@Module({
    imports: [UsersModule, SharedModule, DoctorsModule, PantientsModule, SchedulesModule, VisitsModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
