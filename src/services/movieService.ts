import type { Movie } from "../types/movie"
import axios from "axios";
axios.defaults.baseURL="https:///api.themoviedb.org/3";



interface MoviesHttpResponse{
    movies: Movie[];
}

const myToken = import.meta.env.VITE_API_TOKEN;

export const movieService = async (query: string): Promise<Movie[]> =>{
      const response = await axios.get<MoviesHttpResponse>(`query`, {
            params:{
                query
            },
            headers: {
            Authorization: `Bearer ${myToken}`
  }
        });
      console.log(query);

      return response.data.movies;
  };