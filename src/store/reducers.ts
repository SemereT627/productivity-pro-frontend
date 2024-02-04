import { combineReducers } from "@reduxjs/toolkit";
import songSlice from "./features/song.slice";

const rootReducer = combineReducers({
  [songSlice.name]: songSlice.reducer,
});

export default rootReducer;
