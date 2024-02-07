import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../apis";
import * as actions from "../features/stat.slice";
import { StatResponse } from "../types/stat.types";

const { statApi } = api;

function* fetchStatsSaga() {
  try {
    const response: StatResponse = yield call(statApi.fetchStats);
    yield put(
      actions.fetchStatsSuccess({
        stat: response.stat,
        genreSongs: response.genreSongs,
        artistStats: response.artistStats,
        albumSongs: response.albumSongs,
      })
    );
  } catch (error) {
    yield put(actions.fetchStatsFailure(error));
  }
}

function* statSaga() {
  yield takeEvery(actions.fetchStatsStart, fetchStatsSaga);
}

export default statSaga;
