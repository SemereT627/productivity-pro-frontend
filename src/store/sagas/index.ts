import { all } from "redux-saga/effects";
import songsSaga from "./song.saga";
import artistsSaga from "./artist.saga";
import genresSaga from "./genre.saga";
import albumsSaga from "./album.saga";

function* rootSaga() {
  yield all([songsSaga(), artistsSaga(), genresSaga(), albumsSaga()]);
}

export default rootSaga;
