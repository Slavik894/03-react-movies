import { useState } from "react";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./App.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { movieService } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";


export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) =>{
    setIsLoading(true);
    try{
      const data = await movieService(query);
      if(data.length === 0){
        toast.error("No movies found for your request.");
        return;
      }
      setIsLoading(false);
      setMovies(data);
    }
    catch(error){
      toast.error(`${error}`);
    }
  }

  const onMovieSelect=(movie: Movie)=>{
    console.log(movie.id);
  }

return(
    <div className={styles.app}>
      <div><Toaster/></div>
    <SearchBar onSubmit={handleSearch} />
    {isLoading && <Loader />}
    {movies.length>0 && (
      <MovieGrid movies={movies} onSelect={onMovieSelect} />
    )}
    
    
  </div>
  )}