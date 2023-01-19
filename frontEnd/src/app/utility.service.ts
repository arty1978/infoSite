import { Injectable } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  user: Users | undefined;

  reflaction<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  constructor() {}
}
