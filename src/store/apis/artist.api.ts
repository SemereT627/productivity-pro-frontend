import api from "../../utils/axios";
import { Artist } from "../types/artist.types";

const ARTISTS_URL = "/artists";

const fetchArtists = async () => {
  const response = await api.get<Artist[]>(ARTISTS_URL);
  return response.data;
};

const createArtist = async (artist: Artist) => {
  const response = await api.post<Artist>(ARTISTS_URL, artist);
  return response.data;
};

const updateArtist = async (artist: Artist) => {
  const response = await api.patch<Artist>(
    `${ARTISTS_URL}/${artist._id}`,
    artist
  );
  return response.data;
};

const deleteArtist = async (id: string) => {
  const response = await api.delete<Artist>(`${ARTISTS_URL}/${id}`);
  return response.data;
};

export { fetchArtists, createArtist, updateArtist, deleteArtist };
