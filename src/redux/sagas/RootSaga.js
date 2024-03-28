import { all } from "redux-saga/effects";
import * as AuthenticationSaga from "./AuthenticationSaga";
import * as UserSaga from "./UserSaga";
import * as ProjectSaga from "./ProjectSaga";
import * as ProjectCategorySaga from "./ProjectCategorySaga";
import * as TaskTypeSaga from "./TaskTypeSaga";
import * as StatusSaga from "./StatusSaga";
import * as PrioritySaga from "./PrioritySaga";
import * as TaskSaga from "./TaskSaga";
import * as CommentSaga from "./CommentSaga";

export function* RootSaga() {
  yield all([
    // Authentication Saga
    AuthenticationSaga.watchLoginSaga(),
    AuthenticationSaga.watchSignupSaga(),

    // User Saga
    UserSaga.watchGetAllUserSaga(),
    UserSaga.watchUpdateUserSaga(),
    UserSaga.watchDeleteUserSaga(),
    UserSaga.watchGetUsersByKeywordSaga(),
    UserSaga.watchGetUsersByProjectIdSaga(),

    // Project Saga
    ProjectSaga.watchGetAllProjectSaga(),
    ProjectSaga.watchDeleteProjectSaga(),
    ProjectSaga.watchCreateNewProjectSaga(),
    ProjectSaga.watchRemoveUserFromProject(),
    ProjectSaga.watchAssignUserProject(),
    ProjectSaga.watchUpdateProjectSaga(),
    ProjectSaga.watchGetProjectDetailSaga(),

    // Project Category Saga
    ProjectCategorySaga.watchGetProjectCategorySaga(),

    // Task Type Saga
    TaskTypeSaga.watchGetTaskTypeSaga(),

    // Status Saga
    StatusSaga.watchGetStatusSaga(),

    // Priority Saga
    PrioritySaga.watchGetPrioritySaga(),

    // Task Saga
    TaskSaga.watchCreateTaskSaga(),
    TaskSaga.watchGetTaskDetailSaga(),
    TaskSaga.watchUpdateTaskSaga(),
    TaskSaga.watchDeleteTaskSaga(),
    TaskSaga.watchUpdateTaskStatusSaga(),

    // Comment Saga
    CommentSaga.watchGetAllCommentSaga(),
    CommentSaga.watchInsertCommentSaga(),
    CommentSaga.watchDeteleCommentSaga(),
    CommentSaga.watchEditCommentSaga(),
  ]);
}
