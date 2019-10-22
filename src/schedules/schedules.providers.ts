import { Schedule } from './schedule.entity';

export const schedulesProviders = [{ provide: 'SchedulesRepository', useValue: Schedule }];
