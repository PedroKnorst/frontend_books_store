import { IClient } from './client';
import { ISalesperson } from './salesperson';

export type Profiles = 'SALESPERSON' | 'CLIENT';

export interface IUser {
  name: string;
  email: string;
  token: string;
  salespersonId?: string;
  Salesperson?: ISalesperson;
  clientId?: string;
  Client?: IClient;
}

export interface IAuthUser {
  email: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  phone?: string;
  profile: Profiles;
}
