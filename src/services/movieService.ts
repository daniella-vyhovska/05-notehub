import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string, page: number): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(API_URL, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
}

