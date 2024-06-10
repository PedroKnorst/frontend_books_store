export type Profiles = 'SALESPERSON' | 'CLIENT';

export interface IUser {
  name: string;
  email: string;
  profile: Profiles;
  token: string;
}

export interface IAuthUser {
  email: string;
  password: string;
}
