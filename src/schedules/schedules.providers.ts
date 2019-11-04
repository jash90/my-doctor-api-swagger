import { Schedule } from './schedule.entity';
import { Doctor } from '../doctors/doctor.entity';

export const schedulesProviders = [{ provide: 'SchedulesRepository', useValue: Schedule }, { provide: 'DoctorsRepository', useValue: Doctor }];
