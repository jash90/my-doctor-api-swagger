import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { visitsProviders } from './visits.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [VisitsController],
    providers: [VisitsService, ...visitsProviders],
    exports: [],
})
export class VisitsModule {}
