import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
    imports: [UsersModule, SharedModule, DoctorsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
