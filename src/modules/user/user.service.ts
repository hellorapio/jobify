import userRepository from "./user.repository";

class UserService {
  static async me(id: string) {
    const user = await userRepository.findById(id);
    return user;
  }

  static async updateMe(id: string, body: object) {
    const user = await userRepository.updateOneById(id, body);
    return user;
  }

  static async deleteMe(id: string) {
    await userRepository.updateOneById(id, { active: false });
  }
}

export default UserService;
