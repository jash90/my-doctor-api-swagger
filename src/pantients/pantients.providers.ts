import { Pantient } from './pantient.entity';

export const pantientsProviders = [{ provide: 'PantientsRepository', useValue: Pantient }];
