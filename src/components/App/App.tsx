import { useState } from "react";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./App.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { movieService } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) =>{
    setIsLoading(true);
    try{
      setMovies([]);
      const data = await movieService(query);
      if(data.length === 0){
        setIsLoading(false);
        toast.error("No movies found for your request.");
        return;
      }
      setIsLoading(false);
      setMovies(data);
    }
    catch {
      setIsLoading(false);
      setIsError(true);
    }
    finally{
      setIsLoading(false);
    }

  }

  const onMovieSelect=(movie: Movie)=>{
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }
  const closeModal = () =>{
    setSelectedMovie(null);
    setIsModalOpen(false);
  }

return(
    <div className={styles.app}>
      <div><Toaster/></div>
    <SearchBar onSubmit={handleSearch} />
    {isLoading && <Loader />}
    {movies.length>0 && !isLoading && (
      <MovieGrid movies={movies} onSelect={onMovieSelect}/>)}
    {isError && <ErrorMessage />}
    {isModalOpen && selectedMovie && (<MovieModal movie={selectedMovie} onClose={closeModal}/>)}
    
    
  </div>
  )}