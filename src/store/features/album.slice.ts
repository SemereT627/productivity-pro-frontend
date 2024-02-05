import { createSlice } from "@reduxjs/toolkit";
import { AlbumState } from "../types/album.types";

const INITIAL_STATE: AlbumState = {
  loading: false,
  createAlbumSuccess: false,
  updateAlbumSuccess: false,
  error: "",

  albums: [],
};

const albumSlice = createSlice({
  name: "albums",
  initialState: INITIAL_STATE,
  reducers: {
    fetchAlbumsStart: (state: AlbumState) => {
      state.loading = true;
    },
    fetchAlbumsSuccess: (state: AlbumState, action) => {
      state.loading = false;
      state.albums = action.payload;
    },
    fetchAlbumsFailure: (state: AlbumState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createAlbumStart: (state: AlbumState, action) => {
      state.loading = true;
    },
    createAlbumSuccess: (state: AlbumState, action) => {
      state.loading = false;
      state.createAlbumSuccess = true;
      state.albums.push(action.payload);
    },
    createAlbumFailure: (state: AlbumState, action) => {
      state.loading = false;
      state.createAlbumSuccess = false;
      state.error = action.payload;
    },
    clearCreateAlbum: (state: AlbumState) => {
      state.loading = false;
      state.createAlbumSuccess = false;
      state.error = "";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAlbumStart: (state: AlbumState, action) => {
      state.loading = true;
    },
    updateAlbumSuccess: (state: AlbumState, action) => {
      state.loading = false;
      state.updateAlbumSuccess = true;
      state.albums = state.albums.map((album) =>
        album._id === action.payload._id ? action.payload : album
      );
    },
    updateAlbumFailure: (state: AlbumState, action) => {
      state.loading = false;
      state.updateAlbumSuccess = false;
      state.error = action.payload;
    },
    clearUpdateAlbum: (state: AlbumState) => {
      state.loading = false;
      state.updateAlbumSuccess = false;
      state.error = "";
    },
  },
});

export const {
  fetchAlbumsStart,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  createAlbumStart,
  createAlbumSuccess,
  createAlbumFailure,
  clearCreateAlbum,
  updateAlbumStart,
  updateAlbumSuccess,
  updateAlbumFailure,
  clearUpdateAlbum,
} = albumSlice.actions;

export default albumSlice;
