import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../apis";
import * as actions from "../features/genre.slice";
import { Genre, GenreResponse } from "../types/genre.types";

const { genreApi } = api;

function* fetchGenresSaga() {
  try {
    const response: GenreResponse = yield call(genreApi.getGenres);
    yield put(actions.fetchGenresSuccess(response.genres));
  } catch (error) {
    yield put(actions.fetchGenresFailure(error));
  }
}

function* createGenreSaga(action: { payload: Genre }) {
  try {
    const response: GenreResponse = yield call(
      genreApi.createGenre,
      action.payload
    );
    yield put(actions.createGenreSuccess(response.genre));
  } catch (error) {
    yield put(actions.createGenreFailure(error));
  }
}

function* updateGenreSaga(action: { payload: Genre }) {
  try {
    const response: GenreResponse = yield call(
      genreApi.updateGenre,
      action.payload
    );
    yield put(actions.updateGenreSuccess(response.genre));
  } catch (error) {
    yield put(actions.updateGenreFailure(error));
  }
}

function* genresSaga() {
  yield takeEvery(actions.fetchGenresStart, fetchGenresSaga);
  yield takeEvery(actions.createGenreStart, createGenreSaga);
  yield takeEvery(actions.updateGenreStart, updateGenreSaga);
}

export default genresSaga;
