import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../services/TaskTypeService";
import { STATUS_CODE } from "../../utils/constants/SystemConstants";
import {
  GET_TASK_TYPE,
  GET_TASK_TYPE_SAGA,
} from "../constants/TaskTypeConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";

function* getTaskTypeSaga() {
  try {
    const { data } = yield call(() => taskTypeService.getTaskType());
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_TYPE,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

export function* watchGetTaskTypeSaga() {
  yield takeLatest(GET_TASK_TYPE_SAGA, getTaskTypeSaga);
}
