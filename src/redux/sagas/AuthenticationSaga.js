import { call, takeLatest, delay, put } from "redux-saga/effects";
import { authenticationService } from "../../services/AuthenticationService";
import {
  STATUS_CODE,
  USER_INFO,
  USER_TOKEN,
} from "../../utils/constants/SystemConstants";
import { history } from "../../utils/libs/history";
import { LOGIN_SAGA, SIGNUP_SAGA } from "../constants/AuthenticationConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";

function* loginSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(500);
    const { data } = yield call(() =>
      authenticationService.login(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      localStorage.setItem(USER_TOKEN, data.content.accessToken);
      const userInfo = {
        id: data.content.id,
        email: data.content.email,
        avatar: data.content.avatar,
        name: data.content.name,
        phoneNumber: data.content.phoneNumber,
      };
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
      NotifyFunction("success", "Success", "Login successfully");
      history.push("/projectmanagement");
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data.message);
    NotifyFunction("error", "Error", error.response?.data.message);
  } finally {
    yield put({
      type: HIDE_LOADING,
    });
  }
}

function* signupSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(500);
    const { data } = yield call(() =>
      authenticationService.signup(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction(
        "success",
        "Success",
        "Registerred successfully! Please login to access to our website!"
      );
      history.push("/login");
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  } finally {
    yield put({
      type: HIDE_LOADING,
    });
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_SAGA, loginSaga);
}

export function* watchSignupSaga() {
  yield takeLatest(SIGNUP_SAGA, signupSaga);
}
