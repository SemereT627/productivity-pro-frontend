import { all } from "redux-saga/effects";
import songsSaga from "./song.saga";

function* rootSaga() {
  yield all([songsSaga()]);
}

export default rootSaga;
