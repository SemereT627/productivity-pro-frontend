import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../apis";
import * as actions from "../features/song.slice";
import { Song, SongResponse } from "../types/song.types";

const { songApi } = api;

function* fetchSongsSaga() {
  try {
    const response: SongResponse = yield call(songApi.fetchSongs);
    yield put(actions.fetchSongsSuccess(response.songs));
  } catch (error) {
    yield put(actions.fetchSongsFailure(error));
  }
}

function* createSongSaga(action: { payload: Song }) {
  try {
    const response: SongResponse = yield call(
      songApi.createSong,
      action.payload
    );
    yield put(actions.createSongSuccess(response.song));
  } catch (error) {
    yield put(actions.createSongFailure(error));
  }
}

function* updateSongSaga(action: { payload: Song }) {
  try {
    const response: SongResponse = yield call(
      songApi.updateSong,
      action.payload
    );
    yield put(actions.updateSongSuccess(response.song));
  } catch (error) {
    yield put(actions.updateSongFailure(error));
  }
}

function* songsSaga() {
  yield takeEvery(actions.fetchSongsStart, fetchSongsSaga);
  yield takeEvery(actions.createSongStart, createSongSaga);
  yield takeEvery(actions.updateSongStart, updateSongSaga);
}

export default songsSaga;
