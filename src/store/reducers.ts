import { combineReducers } from "@reduxjs/toolkit";
import songSlice from "./features/song.slice";
import artistSlice from "./features/artist.slice";
import genreSlice from "./features/genre.slice";

const rootReducer = combineReducers({
  [songSlice.name]: songSlice.reducer,
  [artistSlice.name]: artistSlice.reducer,
  [genreSlice.name]: genreSlice.reducer,
});

export default rootReducer;
