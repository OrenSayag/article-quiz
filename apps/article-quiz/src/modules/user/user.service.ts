import { Injectable } from '@nestjs/common';
import { getUser as _getUser } from './methods/get-user';
import { updateUser as _updateUser } from './methods/update-user';

@Injectable()
export class UserService {
  getUser(userId: string) {
    return _getUser({ id: userId });
  }
  updateUser(input: Parameters<typeof _updateUser>[0]) {
    return _updateUser(input);
  }
}
