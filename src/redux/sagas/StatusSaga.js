import { put, call, takeLatest } from "redux-saga/effects";
import { statusService } from "../../services/StatusService";
import { STATUS_CODE } from "../../utils/constants/SystemConstants";
import { GET_STATUS, GET_STATUS_SAGA } from "../constants/StatusConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";

function* getStatusSaga() {
  try {
    const { data } = yield call(() => statusService.getStatus());
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_STATUS,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

export function* watchGetStatusSaga() {
  yield takeLatest(GET_STATUS_SAGA, getStatusSaga);
}
