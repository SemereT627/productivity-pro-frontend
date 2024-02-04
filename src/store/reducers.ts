import { combineReducers } from "@reduxjs/toolkit";
import songSlice from "./features/song.slice";
import artistSlice from "./features/artist.slice";

const rootReducer = combineReducers({
  [songSlice.name]: songSlice.reducer,
  [artistSlice.name]: artistSlice.reducer,
});

export default rootReducer;
