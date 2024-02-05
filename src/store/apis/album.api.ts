import api from "../../utils/axios";
import { Album } from "../types/album.types";

const ALBUM_URL = "/albums";

const fetchAlbums = async () => {
  const response = await api.get<Album[]>(ALBUM_URL);
  return response.data;
};

const createAlbum = async (album: Album) => {
  const response = await api.post<Album>(ALBUM_URL, album);
  return response.data;
};

const updateAlbum = async (album: Album) => {
  const response = await api.patch<Album>(`${ALBUM_URL}/${album._id}`, album);
  return response.data;
};

const deleteAlbum = async (id: string) => {
  const response = await api.delete<Album>(`${ALBUM_URL}/${id}`);
  return response.data;
};

export { fetchAlbums, createAlbum, updateAlbum, deleteAlbum };
