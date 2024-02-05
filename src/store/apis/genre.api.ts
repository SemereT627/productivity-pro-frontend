import api from "../../utils/axios";
import { Genre } from "../types/genre.types";

const GENRES_API = "/genres";

const getGenres = async () => {
  const response = await api.get(GENRES_API);
  return response.data;
};

const createGenre = async (genre: Genre) => {
  const response = await api.post(GENRES_API, genre);
  return response.data;
};

const updateGenre = async (genre: Genre) => {
  const response = await api.patch(`${GENRES_API}/${genre._id}`, genre);
  return response.data;
};

const deleteGenre = async (id: string) => {
  const response = await api.delete(`${GENRES_API}/${id}`);
  return response.data;
};

export { getGenres, createGenre, updateGenre, deleteGenre };
