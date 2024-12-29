import * as Sequelize from 'sequelize';
import { WhereOptions } from 'sequelize';

import { InputUserInterface, UserInterface } from '../interfaces';
import { UserRepository } from '../repositories';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async create(input: InputUserInterface): Promise<UserInterface> {
    if (input.email) {
      const emailExists = await this.repository.findOne({
        where: { email: input.email.trim() },
      });
      if (emailExists) throw new Error(`user.emailExists.error`);
    }
    return this.repository.create(input);
  }

  public async findOne({ email }: { email?: string; }): Promise<UserInterface> {
    let where: WhereOptions<any> = {};
    if (email) where = { ...where, email: email };
    return this.repository.findOne({ where });
  }

  public async updateOne(id: Sequelize.CreationOptional<number>, input: Partial<InputUserInterface>): Promise<UserInterface> {
    const userExists = await this.repository.findByPk(id);
    if (!userExists) throw new Error(`user.userExists.error`);

    if (input.email) {
      const emailExists = await this.repository.findOne({
        where: { email: input.email.trim() },
      });
      if (emailExists && emailExists.id !== id) throw new Error(`user.emailExists.error`);
    }
    await this.repository.updateOne({ id, input });
    return this.repository.findByPk(id);
  }
}
