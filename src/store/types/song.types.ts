import { Album } from "./album.types";
import { Genre } from "./genre.types";

export type Song = {
  _id?: string;
  title: string;
  duration: string;
  album: Album;
  genre: Genre;
  createdAt?: string;
  updatedAt?: string;
};

export type SongState = {
  songs: Song[];
  loading: boolean;
  createSongSuccess: boolean;
  updateSongSuccess: boolean;
  error: string;
};

export type SongResponse = {
  songs: Song[];
  song: Song;
};

export type CreateSong = {
  title: string;
  artist: string;
  album: string;
  genre: string;
};
