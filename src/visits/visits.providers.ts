import { Visit } from './visit.entity';
import { Schedule } from '../schedules/schedule.entity';

export const visitsProviders = [{ provide: 'VisitsRepository', useValue: Visit }, { provide: 'SchedulesRepository', useValue: Schedule }];
