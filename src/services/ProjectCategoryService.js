import { BaseService } from "./BaseService";

class ProjectCategoryService extends BaseService {
  constructor() {
    super();
  }
  getProjectCategory() {
    return this.get("/ProjectCategory")
  }
}

export const projectCategoryService = new ProjectCategoryService();
