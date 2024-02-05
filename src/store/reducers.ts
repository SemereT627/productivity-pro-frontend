import { combineReducers } from "@reduxjs/toolkit";
import songSlice from "./features/song.slice";
import artistSlice from "./features/artist.slice";
import genreSlice from "./features/genre.slice";
import albumSlice from "./features/album.slice";

const rootReducer = combineReducers({
  [songSlice.name]: songSlice.reducer,
  [artistSlice.name]: artistSlice.reducer,
  [genreSlice.name]: genreSlice.reducer,
  [albumSlice.name]: albumSlice.reducer,
});

export default rootReducer;
