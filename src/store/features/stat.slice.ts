import { createSlice } from "@reduxjs/toolkit";
import { StatState } from "../types/stat.types";

const INITIAL_STATE: StatState = {
  stat: {
    songs: 0,
    artists: 0,
    genres: 0,
    albums: 0,
  },
  loading: false,
  error: "",
  genreSongs: [],
  artistStats: [],
  albumSongs: [],
};

const statSlice = createSlice({
  name: "stats",
  initialState: INITIAL_STATE,
  reducers: {
    fetchStatsStart: (state: StatState) => {
      state.loading = true;
    },
    fetchStatsSuccess: (
      state: StatState,
      { payload: { stat, genreSongs, artistStats, albumSongs } }
    ) => {
      state.loading = false;
      state.stat = stat;
      state.genreSongs = genreSongs;
      state.artistStats = artistStats;
      state.albumSongs = albumSongs;
    },
    fetchStatsFailure: (state: StatState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearStatsError: (state: StatState) => {
      state.loading = false;
      state.error = "";
    },
  },
});

export const {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  clearStatsError,
} = statSlice.actions;
export default statSlice;
