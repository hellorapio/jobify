import BaseService from "../../bases/base.service";
import { IUser } from "./model/user.interface";
import userRepository from "./user.repository";

class UserService extends BaseService<IUser, typeof userRepository> {
  constructor() {
    super(userRepository);
  }

  async me(id: string) {
    const user = await this.repo.findById(id);
    return user;
  }

  async updateMe(id: string, body: object) {
    const user = await this.repo.updateOneById(id, body);
    return user;
  }

  override async delete(id: string) {
    await this.repo.updateOneById(id, { active: false });
  }
}

export default UserService.getInstance();
