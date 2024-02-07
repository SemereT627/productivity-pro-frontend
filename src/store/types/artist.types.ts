export type Artist = {
  _id?: string;
  name: string;
  birthDate: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ArtistState = {
  artists: Artist[];
  loading: boolean;
  createArtistSuccess: boolean;
  delArtistSuccess: boolean;
  updateArtistSuccess: boolean;
  error: string;
};

export type ArtistResponse = {
  artists: Artist[];
  artist: Artist;
  _id: string;
};
