import { all } from "redux-saga/effects";
import songsSaga from "./song.saga";
import artistsSaga from "./artist.saga";

function* rootSaga() {
  yield all([songsSaga(), artistsSaga()]);
}

export default rootSaga;
