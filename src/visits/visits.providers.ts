import { Visit } from './visit.entity';
import { Schedule } from '../schedules/schedule.entity';
import { Doctor } from '../doctors/doctor.entity';
import { Pantient } from '../pantients/pantient.entity';

export const visitsProviders = [{ provide: 'VisitsRepository', useValue: Visit }, { provide: 'SchedulesRepository', useValue: Schedule },
    { provide: 'DoctorsRepository', useValue: Doctor }, { provide: 'PantientsRepository', useValue: Pantient }];
