import { USER_TOKEN } from "../utils/constants/SystemConstants";
import { BaseService } from "./BaseService";

class UserService extends BaseService {
  constructor() {
    super();
  }
  getAllUsers(payload) {
    return this.get(`/Users/getUser?keyword=${payload}`);
  }
  updateUser(payload) {
    return this.put("/Users/editUser", payload);
  }
  deleteUser(payload) {
    return this.delete(`/Users/deleteUser?id=${payload}`);
  }
  getUsersByProjectId(payload) {
    return this.get(`/Users/getUserByProjectId?idProject=${payload}`);
  }
  
}

export const userService = new UserService();
