import { NextFunction, Response } from 'express';

import { jwtAuthSecret } from '../config';
import { JWT } from '../utils';
import { UserService } from '../services';
import { UserRequestInterface } from '../interfaces';

class AuthGuard {
  private static instance: AuthGuard;

  private constructor() {}

  public static get(): AuthGuard {
    if (!AuthGuard.instance) {
      AuthGuard.instance = new AuthGuard();
    }
    return AuthGuard.instance;
  }

  public authenticate = async (req: UserRequestInterface, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer')) {
      res.status(401).send({ message: 'Authorization failed' });
    } else {
      const accessToken = authorization.replace('Bearer ', '');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = JWT.verify(accessToken, jwtAuthSecret.access);
      if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
        res.status(403).send({ error: 'Invalid or expired token' });
      } else {
        const userExists = await new UserService().findByPk(decodedToken.id);
        if (!userExists) res.status(401).send({ message: 'User not found' });
        req.currentUser = userExists;
        next();
      }
    }
  };
}

const authGuard = AuthGuard.get();

export { authGuard as AuthGuard };
