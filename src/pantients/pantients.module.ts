import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { PantientsController } from './pantients.controller';
import { PantientsService } from './pantients.service';
import { pantientsProviders } from './pantients.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [PantientsController],
    providers: [PantientsService, ...pantientsProviders],
    exports: [],
})
export class PantientsModule {}
