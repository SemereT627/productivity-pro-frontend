import { CustomError } from "./common.types";

export type Genre = {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GenreState = {
  genres: Genre[];
  loading: boolean;
  createGenreSuccess: boolean;
  delGenreSuccess: boolean;
  updateGenreSuccess: boolean;
  error: CustomError | string;
};

export type GenreResponse = {
  genres: Genre[];
  genre: Genre;
  _id: string;
};
