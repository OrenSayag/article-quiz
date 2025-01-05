import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { userIdHeaderName } from '@article-quiz/shared-types';
import { getUser } from '@article-quiz/db';

declare global {
  interface Request {
    user?: {
      id: string;
    };
  }
}

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers[userIdHeaderName.toLowerCase()];
    await getUser({ id: userId });
    request.user = {
      id: userId,
    };
    return true;
  }
}
