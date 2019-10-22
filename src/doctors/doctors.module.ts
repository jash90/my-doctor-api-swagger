import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { doctorsProviders } from './doctors.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [DoctorsController],
    providers: [DoctorsService, ...doctorsProviders],
    exports: [],
})
export class DoctorsModule {}
