import { BaseService } from "./BaseService";

class ProjectService extends BaseService {
  constructor() {
    super();
  }

  getAllProject(payload) {
    if (payload === "") return this.get("/Project/getAllProject");
    else return this.get(`/Project/getAllProject?keyword=${payload}`);
  }

  deleteProject(payload) {
    return this.delete(`/Project/deleteProject?projectId=${payload}`);
  }

  addNewProject(payload) {
    return this.post(`/Project/createProject`, payload);
  }

  removeUserFromProject(payload) {
    return this.post("/Project/removeUserFromProject", payload);
  }

  assignUserProject(payload) {
    return this.post("/Project/assignUserProject", payload);
  }

  editProjet(payload) {
    return this.put(`/Project/updateProject?projectId=${payload.id}`, payload);
  }

  getProjectById(payload) {
    return this.get(`/Project/getProjectDetail?id=${payload}`);
  }
}

export const projectService = new ProjectService();
