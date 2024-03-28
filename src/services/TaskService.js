import { BaseService } from "./BaseService";

class TaskService extends BaseService {
  constructor() {
    super();
  }

  createTask(payload) {
    return this.post("/Project/createTask", payload);
  }

  getTaskDetail(payload) {
    return this.get(`/Project/getTaskDetail?taskId=${payload}`);
  }

  updateTask(payload) {
    return this.post("/Project/updateTask", payload);
  }

  deleteTask(payload) {
    return this.delete(`/Project/removeTask?taskId=${payload}`);
  }
  updateTaskStatus(payload) {
    return this.put("/Project/updateStatus", payload);
  }
}

export const taskService = new TaskService();
