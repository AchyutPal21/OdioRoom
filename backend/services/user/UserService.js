import { User } from "../../models/User.model.js";

class UserService {
  async createUser(payload = {}) {
    if (!payload || Object.keys(payload).length === 0) {
      throw new Error("User cannot be created without any fields");
    }
    const user = await User.create(payload);
    return user.get({ plain: true });
  }

  async getAllUsers(attributes = null) {
    const users = await User.findAll({
      attributes: attributes || undefined, // use all if not provided
      raw: true,
    });
    return users;
  }

  async getUserById(id, attributes = null) {
    if (!id) throw new Error("User ID is required");
    const user = await User.findByPk(id, {
      attributes: attributes || undefined,
      raw: true,
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async getUserByFields(filter = {}, attributes = []) {
    if (!filter || Object.keys(filter).length === 0) {
      throw new Error("Filter fields are required");
    }

    const user = await User.findOne({
      where: filter,
      attributes: attributes.length ? attributes : undefined,
      raw: true,
    });

    return user;
  }

  async updateUser(id, data = {}) {
    if (!id) throw new Error("User ID is required");
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No update data provided");
    }

    const [affectedRows] = await User.update(data, {
      where: { id },
    });

    if (affectedRows === 0) throw new Error("User not found or no changes made");

    const updatedUser = await this.getUserById(id);
    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) throw new Error("User ID is required");

    const deletedCount = await User.destroy({ where: { id } });
    if (deletedCount === 0) throw new Error("User not found");

    return true;
  }
}

const userService = new UserService();
export { userService };
