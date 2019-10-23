import { Visit } from './visit.entity';

export const visitsProviders = [{ provide: 'VisitsRepository', useValue: Visit }];
