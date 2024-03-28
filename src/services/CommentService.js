import { BaseService } from "./BaseService";

class CommentService extends BaseService {
  constructor() {
    super();
  }
  getAllComment() {
    return this.get("/Comment/getAll");
  }
  insertComment(payload) {
    return this.post("/Comment/insertComment", payload);
  }
  deleteComment(payload) {
    return this.delete(`/Comment/deleteComment?idComment=${payload}`);
  }
  updateComment(payload) {
    const { id, contentComment } = payload;
    return this.put(
      `/Comment/updateComment?id=${id}&contentComment=${contentComment}`,
      payload
    );
  }
}

export const commentService = new CommentService();
