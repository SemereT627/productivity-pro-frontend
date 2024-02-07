import { createSlice } from "@reduxjs/toolkit";
import { GenreState } from "../types/genre.types";

const INITIAL_STATE: GenreState = {
  loading: false,
  createGenreSuccess: false,
  updateGenreSuccess: false,
  delGenreSuccess: false,
  error: "",
  genres: [],
};

const genreSlice = createSlice({
  name: "genres",
  initialState: INITIAL_STATE,
  reducers: {
    fetchGenresStart: (state: GenreState) => {
      state.loading = true;
    },
    fetchGenresSuccess: (state: GenreState, action) => {
      state.loading = false;
      state.genres = action.payload;
    },
    fetchGenresFailure: (state: GenreState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createGenreStart: (state: GenreState, action) => {
      state.loading = true;
    },
    createGenreSuccess: (state: GenreState, action) => {
      state.loading = false;
      state.createGenreSuccess = true;
      state.genres.push(action.payload);
    },
    createGenreFailure: (state: GenreState, action) => {
      state.loading = false;
      state.createGenreSuccess = false;
      state.error = action.payload;
    },
    clearCreateGenre: (state: GenreState) => {
      state.loading = false;
      state.createGenreSuccess = false;
      state.error = "";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateGenreStart: (state: GenreState, action) => {
      state.loading = true;
    },
    updateGenreSuccess: (state: GenreState, action) => {
      state.loading = false;
      state.updateGenreSuccess = true;
      state.genres = state.genres.map((genre) =>
        genre._id === action.payload._id ? action.payload : genre
      );
    },
    updateGenreFailure: (state: GenreState, action) => {
      state.loading = false;
      state.updateGenreSuccess = false;
      state.error = action.payload;
    },
    clearUpdateGenre: (state: GenreState) => {
      state.loading = false;
      state.updateGenreSuccess = false;
      state.error = "";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteGenreStart: (state: GenreState, action) => {
      state.loading = true;
    },
    deleteGenreSuccess: (state: GenreState, action) => {
      state.loading = false;
      state.delGenreSuccess = true;
      state.genres = state.genres.filter(
        (genre) => genre._id !== action.payload
      );
    },
    deleteGenreFailure: (state: GenreState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDeleteGenre: (state: GenreState) => {
      state.loading = false;
      state.delGenreSuccess = false;
      state.error = "";
    },
  },
});

export const {
  fetchGenresStart,
  fetchGenresSuccess,
  fetchGenresFailure,
  createGenreStart,
  createGenreSuccess,
  createGenreFailure,
  clearCreateGenre,
  updateGenreStart,
  updateGenreSuccess,
  updateGenreFailure,
  clearUpdateGenre,
  deleteGenreStart,
  deleteGenreSuccess,
  deleteGenreFailure,
  clearDeleteGenre,
} = genreSlice.actions;

export default genreSlice;
