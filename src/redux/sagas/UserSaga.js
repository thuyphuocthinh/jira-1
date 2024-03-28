import { findNonSerializableValue } from "@reduxjs/toolkit";
import { call, takeLatest, delay, put } from "redux-saga/effects";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_USER_BY_KEYWORD,
  GET_USER_BY_KEYWORD_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  GET_USER_SEARCH,
  GET_USER_SEARCH_SAGA,
  UPDATE_USER_SAGA,
  VERIFY_TOKEN,
  VERIFY_TOKEN_SAGA,
} from "../constants/UserConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstants";
import { userService } from "../../services/UserService";
import { STATUS_CODE, USER_INFO } from "../../utils/constants/SystemConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import { CLOSE_DRAWER } from "../constants/DrawerConstants";
import { history } from "../../utils/libs/history";

function* getAllUserSaga(action) {
  try {
    const { data } = yield call(() => userService.getAllUsers(action.payload));
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* updateUserSaga(action) {
  try {
    yield put({ type: DISPLAY_LOADING });
    yield delay(500);
    const { data } = yield call(() => userService.updateUser(action.payload));
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction("success", "Success", "Updated user successfully");
      const { avatar } = JSON.parse(localStorage.getItem(USER_INFO));
      localStorage.removeItem(USER_INFO);
      localStorage.setItem(
        USER_INFO,
        JSON.stringify({
          avatar,
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          phoneNumber: action.payload.phoneNumber,
        })
      );
      yield put({
        type: CLOSE_DRAWER,
      });
      yield put({
        type: GET_ALL_USER_SAGA,
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

function* deleteUserSaga(action) {
  try {
    const { data } = yield call(() => userService.deleteUser(action.payload));
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      NotifyFunction("success", "Success", "Deleted user successfully");
      yield put({
        type: GET_ALL_USER_SAGA,
        payload: "",
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* getUsersByKeywordSaga(action) {
  try {
    const { data } = yield call(() => userService.getAllUsers(action.payload));
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_KEYWORD,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* getUsersByProjectIdSaga(action) {
  try {
    const { data } = yield call(() =>
      userService.getUsersByProjectId(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}



export function* watchGetAllUserSaga() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga);
}

export function* watchUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

export function* watchDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

export function* watchGetUsersByKeywordSaga() {
  yield takeLatest(GET_USER_BY_KEYWORD_SAGA, getUsersByKeywordSaga);
}

export function* watchGetUsersByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUsersByProjectIdSaga);
}


