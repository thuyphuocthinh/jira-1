import { BaseService } from "./BaseService";

class TaskTypeService extends BaseService {
  constructor() {
    super();
  }

  getTaskType() {
    return this.get("/TaskType/getAll");
  }
}

export const taskTypeService = new TaskTypeService();
