export type Stat = {
  songs: number;
  artists: number;
  genres: number;
  albums: number;
};

export type StatState = {
  stat: Stat;
  genreSongs: GenreSongs[];
  loading: boolean;
  error: string;
  artistStats: ArtistStats[];
  albumSongs: AlbumSongs[];
};

export type StatResponse = {
  stat: Stat;
  genreSongs: [];
  artistStats: [];
  albumSongs: [];
};

type GenreSongs = {
  count: number;
  _id: {
    _id: string;
    name: string;
  };
};

type ArtistStats = {
  albums: number;
  songs: number;
  artist: string;
};

type AlbumSongs = {
  count: number;
  _id: {
    title: string;
  };
};
