import api from "../../utils/axios";
import { Song } from "../types/song.types";

const SONGS_URL = "/songs";

const fetchSongs = async () => {
  const response = await api.get<Song[]>(SONGS_URL);
  return response.data;
};

const createSong = async (song: Song) => {
  const response = await api.post<Song>(SONGS_URL, song);
  return response.data;
};

const updateSong = async (song: Song) => {
  console.log(song);
  const response = await api.patch<Song>(`${SONGS_URL}/${song._id}`, song);
  return response.data;
};

const deleteSong = async (id: number) => {
  const response = await api.delete<Song>(`${SONGS_URL}/${id}`);
  return response.data;
};

export { fetchSongs, createSong, updateSong, deleteSong };
