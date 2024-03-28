import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../services/PriorityService";
import { STATUS_CODE } from "../../utils/constants/SystemConstants";
import {
  GET_PRIORITY,
  GET_PRIORITY_SAGA,
} from "../constants/PriorityConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";

function* getPrioritySaga() {
  try {
    const { data } = yield call(() => priorityService.getPriority());
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PRIORITY, payload: data.content });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

export function* watchGetPrioritySaga() {
  yield takeLatest(GET_PRIORITY_SAGA, getPrioritySaga);
}
