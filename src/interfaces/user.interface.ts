import * as Sequelize from 'sequelize';

import { ModelTimestampExtend } from '.';

export interface InputUserInterface {
    name: string;
    email: string;
    password: string;
}

export interface UserInterface extends InputUserInterface, ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
}

export interface UserModelInterface
    extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface { }
