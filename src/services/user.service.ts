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
      if (emailExists) throw new Error(`userService.emailExists.error`);
    }
    return this.repository.create(input);
  }

  public async findByPk(id: number): Promise<UserInterface> {
    const userExists = await this.repository.findByPk(id);
    if (!userExists) throw new Error(`userService.notExists.error`);
    return userExists;
}

  public async findOne({ email }: { email?: string; }): Promise<UserInterface> {
    let where: WhereOptions<any> = {};
    if (email) where = { ...where, email: email };
    return this.repository.findOne({ where });
  }
}
