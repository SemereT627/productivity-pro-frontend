import { AlbumState } from "./types/album.types";
import { ArtistState } from "./types/artist.types";
import { GenreState } from "./types/genre.types";
import { SongState } from "./types/song.types";
import { StatState } from "./types/stat.types";

export interface RootStates {
  songs: SongState;
  artists: ArtistState;
  genres: GenreState;
  albums: AlbumState;
  stats: StatState;
}
