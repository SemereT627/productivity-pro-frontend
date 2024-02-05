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
  updateGenreSuccess: boolean;
  error: string;
};

export type GenreResponse = {
  genres: Genre[];
  genre: Genre;
};
