import { all } from "redux-saga/effects";
import songsSaga from "./song.saga";
import artistsSaga from "./artist.saga";
import genresSaga from "./genre.saga";
import albumsSaga from "./album.saga";
import statSaga from "./stat.saga";

function* rootSaga() {
  yield all([
    songsSaga(),
    artistsSaga(),
    genresSaga(),
    albumsSaga(),
    statSaga(),
  ]);
}

export default rootSaga;
