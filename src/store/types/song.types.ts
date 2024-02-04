export type Song = {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
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
