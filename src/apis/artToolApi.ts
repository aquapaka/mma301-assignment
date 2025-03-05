import axios from "axios";
import { env } from "../config/config";
import { ArtTool } from "../types/artTool";

const url = env.EXPO_PUBLIC_API_URL;
const artToolResourceName = "art-tools";

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

const artToolApi = {
  getAll: async (): Promise<ArtTool[]> => {
    const response = await axiosInstance.get(artToolResourceName);
    return response.data;
  },
};

export default artToolApi;
