import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../apis";
import * as actions from "../features/album.slice";
import { Album, AlbumResponse } from "../types/album.types";

const { albumApi } = api;

function* fetchAlbumsSaga() {
  try {
    const response: AlbumResponse = yield call(albumApi.fetchAlbums);
    yield put(actions.fetchAlbumsSuccess(response.albums));
  } catch (error) {
    yield put(actions.fetchAlbumsFailure(error));
  }
}

function* createAlbumSaga(action: { payload: Album }) {
  try {
    const response: AlbumResponse = yield call(
      albumApi.createAlbum,
      action.payload
    );
    yield put(actions.createAlbumSuccess(response.album));
  } catch (error) {
    yield put(actions.createAlbumFailure(error));
  }
}

function* updateAlbumSaga(action: { payload: Album }) {
  try {
    const response: AlbumResponse = yield call(
      albumApi.updateAlbum,
      action.payload
    );
    yield put(actions.updateAlbumSuccess(response.album));
  } catch (error) {
    yield put(actions.updateAlbumFailure(error));
  }
}

function* deleteAlbumSaga(action: { payload: string }) {
  try {
    const response: AlbumResponse = yield call(
      albumApi.deleteAlbum,
      action.payload
    );

    yield put(actions.deleteAlbumSuccess(response._id));
  } catch (error) {
    yield put(actions.deleteAlbumFailure(error));
  }
}

function* albumsSaga() {
  yield takeEvery(actions.fetchAlbumsStart, fetchAlbumsSaga);
  yield takeEvery(actions.createAlbumStart, createAlbumSaga);
  yield takeEvery(actions.updateAlbumStart, updateAlbumSaga);
  yield takeEvery(actions.deleteAlbumStart, deleteAlbumSaga);
}

export default albumsSaga;
