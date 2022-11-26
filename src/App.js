import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useState, useEffect} from "react";



let allMovies = [];


const API_URL = "https://www.omdbapi.com/?apikey=45f0782a&s=war"

function App() {

  const [movies, setMovies] = useState(null)
  const [error, setError] = useState(null)
 
  useEffect(() => {
    axios.get(API_URL).then(response => {
      allMovies = response.data.Search
      setMovies(response.data.Search)
      console.log(response)
    }).catch(err => setError(err.message))
  }, [])

  const resultMovies = (searchValue) => {
    if (movies) {
      setMovies(allMovies.filter(movie => movie.Title.toLowerCase().includes(searchValue)))
    }
  }




  return (
    <div className="App">

      <input type="text" placeholder='Search for Movie here'onChange={(e) => resultMovies(e.target.value.toLowerCase())} />
      <div className='movie-container'> 
      
      {movies ? movies.map(movie => <div className="movie-card">
          <img src={movie.Poster}/>
          <p >{movie.Title}</p>
          </div>)
        :<div className='movieDiv'> NO Movies found </div>
        }
       
        
    
    
     </div>
    </div>
  );
}

export default App;