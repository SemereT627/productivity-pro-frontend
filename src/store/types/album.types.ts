import { Artist } from "./artist.types";
import { CustomError } from "./common.types";

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
  delAlbumSuccess: boolean;
  updateAlbumSuccess: boolean;
  error: CustomError | string;
};

export type AlbumResponse = {
  albums: Album[];
  album: Album;
  _id: string;
};
