import { all } from "redux-saga/effects";
import songsSaga from "./song.saga";
import artistsSaga from "./artist.saga";
import genresSaga from "./genre.saga";

function* rootSaga() {
  yield all([songsSaga(), artistsSaga(), genresSaga()]);
}

export default rootSaga;
