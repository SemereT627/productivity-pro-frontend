import api from "../../utils/axios";
import { Stat } from "../types/stat.types";

const STATS_URL = "/stats";

const fetchStats = async () => {
  const response = await api.get<Stat>(STATS_URL);
  return response.data;
};

export { fetchStats };
