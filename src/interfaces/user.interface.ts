import { Request } from 'express';
import { CreationOptional, Model } from 'sequelize';

import { ModelTimestampExtend } from '.';

export interface InputUserInterface {
  name: string;
  email: string;
  password: string;
}

export interface UserInterface extends InputUserInterface, ModelTimestampExtend {
  id: CreationOptional<number>;
}

export interface UserModelInterface extends Model<UserInterface, Partial<InputUserInterface>>, UserInterface {}

export interface UserRequestInterface extends Request {
  currentUser?: Partial<UserInterface>;
}
