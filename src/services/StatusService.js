import { BaseService } from "./BaseService";

class StatusService extends BaseService {
  constructor() {
    super();
  }

  getStatus() {
    return this.get("/Status/getAll");
  }
}

export const statusService = new StatusService();
