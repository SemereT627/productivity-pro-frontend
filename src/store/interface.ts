import { ArtistState } from "./types/artist.types";
import { SongState } from "./types/song.types";

export interface RootStates {
  songs: SongState;
  artists: ArtistState;
}
