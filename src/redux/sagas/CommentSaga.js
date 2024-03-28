import { put, takeLatest, delay, call } from "redux-saga/effects";
import { commentService } from "../../services/CommentService";
import { STATUS_CODE } from "../../utils/constants/SystemConstants";
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../constants/CommentConstants";
import { NotifyFunction } from "../../utils/notification/NotifyFunction";
import { GET_TASK_DETAIL_SAGA } from "../constants/TaskConstants";
import { findNonSerializableValue } from "@reduxjs/toolkit";

function* getAllCommentSaga() {
  try {
    const { data } = yield call(() => commentService.getAllComment());
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* insertCommentSaga(action) {
  try {
    const { data } = yield call(() =>
      commentService.insertComment(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        payload: action.payload.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* deleteCommentSaga(action) {
  try {
    const { data } = yield call(() =>
      commentService.deleteComment(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        payload: action.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

function* editCommentSaga(action) {
  try {
    const { data } = yield call(() =>
      commentService.updateComment(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        payload: action.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    NotifyFunction("error", "Error", error.response?.data.message);
  }
}

export function* watchGetAllCommentSaga() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

export function* watchInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

export function* watchDeteleCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
export function* watchEditCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, editCommentSaga);
}