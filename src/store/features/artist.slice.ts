import { createSlice } from "@reduxjs/toolkit";
import { ArtistState } from "../types/artist.types";

const INITIAL_STATE: ArtistState = {
  loading: false,
  createArtistSuccess: false,
  updateArtistSuccess: false,
  error: "",

  artists: [],
};

const artistSlice = createSlice({
  name: "artists",
  initialState: INITIAL_STATE,
  reducers: {
    fetchArtistsStart: (state: ArtistState) => {
      state.loading = true;
    },
    fetchArtistsSuccess: (state: ArtistState, action) => {
      state.loading = false;
      state.artists = action.payload;
    },
    fetchArtistsFailure: (state: ArtistState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createArtistStart: (state: ArtistState, action) => {
      state.loading = true;
    },
    createArtistSuccess: (state: ArtistState, action) => {
      state.loading = false;
      state.createArtistSuccess = true;
      state.artists.push(action.payload);
    },
    createArtistFailure: (state: ArtistState, action) => {
      state.loading = false;
      state.createArtistSuccess = false;
      state.error = action.payload;
    },
    clearCreateArtist: (state: ArtistState) => {
      state.loading = false;
      state.createArtistSuccess = false;
      state.error = "";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateArtistStart: (state: ArtistState, action) => {
      state.loading = true;
    },
    updateArtistSuccess: (state: ArtistState, action) => {
      state.loading = false;
      state.updateArtistSuccess = true;
      state.artists = state.artists.map((artist) =>
        artist._id === action.payload._id ? action.payload : artist
      );
    },
    updateArtistFailure: (state: ArtistState, action) => {
      state.loading = false;
      state.updateArtistSuccess = false;
      state.error = action.payload;
    },
    clearUpdateArtist: (state: ArtistState) => {
      state.loading = false;
      state.updateArtistSuccess = false;
      state.error = "";
    },
    deleteArtistStart: (state: ArtistState) => {
      state.loading = true;
    },
    deleteArtistSuccess: (state: ArtistState, action) => {
      state.loading = false;
      state.artists = state.artists.filter(
        (artist) => artist._id !== action.payload._id
      );
    },
    deleteArtistFailure: (state: ArtistState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchArtistsStart,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  createArtistStart,
  createArtistSuccess,
  createArtistFailure,
  clearCreateArtist,
  updateArtistStart,
  updateArtistSuccess,
  updateArtistFailure,
  clearUpdateArtist,
  deleteArtistStart,
  deleteArtistSuccess,
  deleteArtistFailure,
} = artistSlice.actions;

export default artistSlice;
