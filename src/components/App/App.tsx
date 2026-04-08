import { useState } from "react";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./App.module.css"
import toast, { Toaster } from 'react-hot-toast';
import { movieService } from "../../services/movieService";


export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);



  
  
return(
    <div className={styles.app}>
      <div><Toaster/></div>
    <SearchBar onSubmit={movieService} />
    
  </div>
  )}