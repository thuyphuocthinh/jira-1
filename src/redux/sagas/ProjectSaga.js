import { call, takeLatest, put, delay } from "redux-saga/effects";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstants";
import { projectService } from "../../services/ProjectService";
import { STATUS_CODE, USER_TOKEN } from "../../utils/constants/SystemConstants";
import {
  ASSIGN_USER_PROJECT_SAGA,
  CREATE_NEW_PROJECT_SAGA,
  CREATE_TASK_SAGA,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../constants/ProjectConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import { history } from "../../utils/libs/history";
import { CLOSE_DRAWER } from "../constants/DrawerConstants";

function* getAllProjectSaga(action) {
  try {
    // yield put({ type: DISPLAY_LOADING });
    // yield delay(500);
    const { data } = yield call(() =>
      projectService.getAllProject(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.reponse?.data.message);
  } finally {
    // yield put({ type: HIDE_LOADING });
  }
}

function* deleteProjectSaga(action) {
  try {
    const { data } = yield call(() =>
      projectService.deleteProject(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction("success", "Success", "Deleted project successfully");
      yield put({
        type: GET_ALL_PROJECT_SAGA,
        payload: "",
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.reponse?.data.message);
  }
}

function* createNewProjectSaga(action) {
  try {
    yield put({ type: DISPLAY_LOADING });
    yield delay(500);
    const { data } = yield call(() =>
      projectService.addNewProject(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction(
        "success",
        "Success",
        "Created a new project successfully"
      );
      yield put({
        type: GET_ALL_PROJECT_SAGA,
        payload: "",
      });
      history.push("/projectmanagement");
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.reponse?.data.message);
  } finally {
    yield put({ type: HIDE_LOADING });
  }
}

function* removeUserFromProjectSaga(action) {
  try {
    const { data } = yield call(() =>
      projectService.removeUserFromProject(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction(
        "success",
        "Success",
        "Removed user from project successfully"
      );
      yield put({
        type: GET_ALL_PROJECT_SAGA,
        payload: "",
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* assignUserProjectSaga(action) {
  try {
    const { data } = yield call(() =>
      projectService.assignUserProject(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction("success", "Success", "Added new member successfully");
      yield put({
        type: GET_ALL_PROJECT_SAGA,
        payload: action.searchProjectKeyword,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* updateProjectSaga(action) {
  try {
    yield put({ type: DISPLAY_LOADING });
    yield delay(500);
    const { data } = yield call(() =>
      projectService.editProjet(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction("success", "Success", "Updated project successfully");
      yield put({
        type: CLOSE_DRAWER,
      });
      yield put({
        type: GET_ALL_PROJECT_SAGA,
        payload: "",
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  } finally {
    yield put({ type: HIDE_LOADING });
  }
}

function* getProjectDetailSaga(action) {
  try {
    if (action.isLoading) {
      yield put({ type: DISPLAY_LOADING });
      yield delay(500);
    }
    const { data } = yield call(() =>
      projectService.getProjectById(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  } finally {
    if (action.isLoading) {
      yield put({ type: HIDE_LOADING });
    }
  }
}

export function* watchGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

export function* watchDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

export function* watchCreateNewProjectSaga() {
  yield takeLatest(CREATE_NEW_PROJECT_SAGA, createNewProjectSaga);
}

export function* watchRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProjectSaga);
}

export function* watchAssignUserProject() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

export function* watchUpdateProjectSaga() {
  yield takeLatest(EDIT_PROJECT_SAGA, updateProjectSaga);
}

export function* watchGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}
