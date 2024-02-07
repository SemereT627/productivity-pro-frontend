import { createSlice } from "@reduxjs/toolkit";
import { SongState } from "../types/song.types";

const INITIAL_STATE: SongState = {
  loading: false,
  createSongSuccess: false,
  delSongSuccess: false,
  updateSongSuccess: false,
  error: "",

  songs: [],
};

const songSlice = createSlice({
  name: "songs",
  initialState: INITIAL_STATE,
  reducers: {
    fetchSongsStart: (state: SongState) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state: SongState, action) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state: SongState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createSongStart: (state: SongState, action) => {
      state.loading = true;
    },
    createSongSuccess: (state: SongState, action) => {
      state.loading = false;
      state.createSongSuccess = true;
      state.songs.push(action.payload);
    },
    createSongFailure: (state: SongState, action) => {
      state.loading = false;
      state.createSongSuccess = false;
      state.error = action.payload;
    },
    clearCreateSong: (state: SongState) => {
      state.loading = false;
      state.createSongSuccess = false;
      state.error = "";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateSongStart: (state: SongState, action) => {
      state.loading = true;
    },
    updateSongSuccess: (state: SongState, action) => {
      state.loading = false;
      state.updateSongSuccess = true;
      state.songs = state.songs.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );
    },
    updateSongFailure: (state: SongState, action) => {
      state.loading = false;
      state.updateSongSuccess = false;
      state.error = action.payload;
    },
    clearUpdateSong: (state: SongState) => {
      state.loading = false;
      state.updateSongSuccess = false;
      state.error = "";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteSongStart: (state: SongState, action) => {
      state.loading = true;
    },
    deleteSongSuccess: (state: SongState, action) => {
      state.loading = false;
      state.delSongSuccess = true;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    deleteSongFailure: (state: SongState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDeleteSong: (state: SongState) => {
      state.loading = false;
      state.delSongSuccess = false;
      state.error = "";
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  clearCreateSong,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  clearUpdateSong,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  clearDeleteSong,
} = songSlice.actions;

export default songSlice;
