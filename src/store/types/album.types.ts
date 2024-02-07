import { Artist } from "./artist.types";

export type Album = {
  _id?: string;
  title: string;
  releaseDate: string;
  artist: Artist;
  createdAt?: string;
  updatedAt?: string;
};

export type AlbumState = {
  albums: Album[];
  loading: boolean;
  createAlbumSuccess: boolean;
  updateAlbumSuccess: boolean;
  error: string;
};

export type AlbumResponse = {
  albums: Album[];
  album: Album;
};
