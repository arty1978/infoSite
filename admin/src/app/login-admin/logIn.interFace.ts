import { Admin } from '../admins-page/admins.interface';

export interface SignIn {
  user: Admin;
  token: string;
  status: 'error' | 'success';
}
