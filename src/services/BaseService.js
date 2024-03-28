import Axios from "axios";
import { DOMAIN, USER_TOKEN } from "../utils/constants/SystemConstants";

export class BaseService {
  constructor() {}
  get(api) {
    return Axios({
      url: `${DOMAIN}${api}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }
  post(api, data) {
    return Axios({
      url: `${DOMAIN}${api}`,
      data,
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }
  put(api, data) {
    return Axios({
      url: `${DOMAIN}${api}`,
      method: "PUT",
      data,
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }
  delete(api) {
    return Axios({
      url: `${DOMAIN}${api}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(USER_TOKEN) },
    });
  }
}
