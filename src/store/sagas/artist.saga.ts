import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../apis";
import * as actions from "../features/artist.slice";
import { Artist, ArtistResponse } from "../types/artist.types";

const { artistApi } = api;

function* fetchArtistsSaga() {
  try {
    const response: ArtistResponse = yield call(artistApi.fetchArtists);
    yield put(actions.fetchArtistsSuccess(response.artists));
  } catch (error) {
    yield put(actions.fetchArtistsFailure(error));
  }
}

function* createArtistSaga(action: { payload: Artist }) {
  try {
    const response: ArtistResponse = yield call(
      artistApi.createArtist,
      action.payload
    );
    yield put(actions.createArtistSuccess(response.artist));
  } catch (error) {
    yield put(actions.createArtistFailure(error));
  }
}

function* updateArtistSaga(action: { payload: Artist }) {
  try {
    const response: ArtistResponse = yield call(
      artistApi.updateArtist,
      action.payload
    );
    yield put(actions.updateArtistSuccess(response.artist));
  } catch (error) {
    yield put(actions.updateArtistFailure(error));
  }
}

function* artistsSaga() {
  yield takeEvery(actions.fetchArtistsStart, fetchArtistsSaga);
  yield takeEvery(actions.createArtistStart, createArtistSaga);
  yield takeEvery(actions.updateArtistStart, updateArtistSaga);
}

export default artistsSaga;
