import { UserInterface, InputUserInterface } from "../interfaces";
import { Models } from "../models";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<InputUserInterface, UserInterface> {
  constructor() {
    super(Models.UserModel);
  }
}
