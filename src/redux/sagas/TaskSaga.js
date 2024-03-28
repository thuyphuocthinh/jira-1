import { put, takeLatest, call, delay, select } from "redux-saga/effects";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstants";
import { taskService } from "../../services/TaskService";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import {
  ADD_ASSIGNEE,
  CHANGE_COMMON_DETAIL,
  DELETE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  REMOVE_ASSIGNEE,
  UPDATE_TASK_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../constants/TaskConstants";
import { STATUS_CODE } from "../../utils/constants/SystemConstants";
import {
  CREATE_TASK_SAGA,
  GET_PROJECT_DETAIL_SAGA,
} from "../constants/ProjectConstants";
import { CLOSE_DRAWER } from "../constants/DrawerConstants";
import { history } from "../../utils/libs/history";

function* createTaskSaga(action) {
  try {
    console.log("Action create task", action);
    yield put({ type: DISPLAY_LOADING });
    yield delay(500);
    const { data } = yield call(() => taskService.createTask(action.payload));
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction("success", "Success", "Create new task successfully");
      yield put({ type: CLOSE_DRAWER });
      yield history.push(`/project/${action.payload.projectId}`);
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        payload: action.payload.projectId,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  } finally {
    yield put({ type: HIDE_LOADING });
  }
}

function* getTaskDetailSaga(action) {
  try {
    yield delay(500);
    const { data } = yield call(() =>
      taskService.getTaskDetail(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* updateTaskSaga(action) {
  const { name, value } = action;
  switch (action.reducerType) {
    case CHANGE_COMMON_DETAIL: {
      yield put({
        type: CHANGE_COMMON_DETAIL,
        name,
        value,
      });
      break;
    }
    case ADD_ASSIGNEE: {
      yield put({
        type: ADD_ASSIGNEE,
        payload: action.payload,
      });
      break;
    }
    case REMOVE_ASSIGNEE: {
      yield put({
        type: REMOVE_ASSIGNEE,
        payload: action.payload,
      });
      break;
    }
    default: {
      break;
    }
  }
  try {
    let { taskDetail } = yield select((state) => state.TaskReducer);
    const listUserAsign = taskDetail.assigness?.map(
      (assignee, index) => assignee.id
    );
    taskDetail = { ...taskDetail, listUserAsign };
    const { data } = yield call(() => taskService.updateTask(taskDetail));
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        payload: taskDetail.projectId,
        isLoading: false,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        payload: taskDetail.taskId,
      });
    }
  } catch (error) {
  }
}

function* deleteTaskSaga(action) {
  try {
    const { data } = yield call(() => taskService.deleteTask(action.payload));
    console.log("data: ", data);
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        payload: action.projectId,
      });
      NotifyFunction("success", "Success", data.content);
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* updateTaskStatusSaga(action) {
  try {
    const { data } = yield call(() =>
      taskService.updateTaskStatus(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        payload: action.payload.projectId,
        isLoading: false,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

export function* watchCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

export function* watchGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

export function* watchUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

export function* watchDeleteTaskSaga() {
  yield takeLatest(DELETE_TASK_SAGA, deleteTaskSaga);
}

export function* watchUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}