import { Doctor } from './doctor.entity';

export const doctorsProviders = [{ provide: 'DoctorsRepository', useValue: Doctor }];
