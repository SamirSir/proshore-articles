import { UserInterface, InputUserInterface } from "../interfaces";
import { BaseRepository } from "./base.repository";
import Models from '../models';

export class UserRepository extends BaseRepository<InputUserInterface, UserInterface> {
  constructor() {
    super(Models.UserModel);
  }
}
