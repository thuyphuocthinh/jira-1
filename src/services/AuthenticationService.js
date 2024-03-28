import { USER_TOKEN } from "../utils/constants/SystemConstants";
import { BaseService } from "./BaseService";

class AuthenticationService extends BaseService {
  constructor() {
    super();
  }
  login(payload) {
    return this.post("/Users/signin", payload);
  }
  signup(payload) {
    return this.post("/Users/signup", payload);
  }
}

export const authenticationService = new AuthenticationService();
