import { Users } from '../users/users.interface';

export interface SignIn {
  user: Users;
  token: string;
  status: 'error' | 'success';
}
