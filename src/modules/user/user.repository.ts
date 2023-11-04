import BaseRepository from "../../bases/base.repository";
import { IUser } from "./model/user.interface";
import User from "./model/user.model";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  override async findOne(filter: object, select: string = "") {
    return await this.model.findOne(filter).select(select);
  }
  override async updateOne(filter: object, body: object, f: string = "") {
    return await this.model.findOneAndUpdate(filter, body).select(f);
  }

  override async findById(id: string, select: string = "") {
    return await this.model.findById(id).select(select);
  }
}

export default UserRepository.getInstance<UserRepository>();
