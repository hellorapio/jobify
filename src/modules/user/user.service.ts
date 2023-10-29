import BaseService from "../../bases/base.service";
import NotFound from "../../errors/notFound";
import { IUser } from "./model/user.interface";
import userRepository from "./user.repository";

class UserService extends BaseService<IUser, typeof userRepository> {
  constructor() {
    super(userRepository);
  }

  override async get(username: string) {
    const user = await this.repo.findOne({ username });
    if (!user)
      throw new NotFound("Account You are Looking for is not Found");
    return user;
  }

  override async delete(id: string) {
    await this.repo.updateOneById(id, { active: false });
  }

  async me(id: string) {
    const user = await this.repo.findById(id);
    return user;
  }
}

export default UserService.getInstance<UserService>();
