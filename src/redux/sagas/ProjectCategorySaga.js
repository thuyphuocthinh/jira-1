import { projectCategoryService } from "../../services/ProjectCategoryService";
import { STATUS_CODE } from "../../utils/constants/SystemConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  GET_PROJECT_CATEGORY,
  GET_PROJECT_CATEGORY_SAGA,
} from "../constants/ProjectCategoryConstants";
import { take } from "lodash";

function* getProjectCategorySaga() {
  try {
    const { data } = yield call(() =>
      projectCategoryService.getProjectCategory()
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_CATEGORY,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

export function* watchGetProjectCategorySaga() {
  yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga);
}
