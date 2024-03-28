import { BaseService } from "./BaseService";

class PriorityService extends BaseService {
  constructor() {
    super();
  }

  getPriority() {
    return this.get(`/Priority/getAll?id=${0}`);
  }
}

export const priorityService = new PriorityService();
