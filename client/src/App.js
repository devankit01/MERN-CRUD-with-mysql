import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieNewReview, setNewMovieReview] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      console.log(res);
      console.log(res.data);
      setMovieList(res.data);
    });
  }, []);

  const handleSubmit = () => {
    // e.preventDefault();

    console.log(movieName, movieReview);
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: movieReview,
    });
    setMovieList([
      ...movieList,
      { movieName: movieName, movieReview: movieReview },
    ]);

    setMovieName("");
    setMovieReview("");
  };

  const deleteMovie  = (movieName) =>{
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  }

  const updateMovie  = (movieName) =>{
    Axios.put("http://localhost:3001/api/update",{
      movieName : movieName,
      movieReview : movieNewReview,
    });

    setNewMovieReview('');
  }


  return (
    <div className="App">
      <h1>MERN CRUD </h1>

      <div className="wrap">

      <input
        type="text"
        placeholder="Movie Name"
        onChange={(e) => setMovieName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Movie Review"
        onChange={(e) => setMovieReview(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Add Movie
      </button>
      </div>
      <h2>Movie List</h2>
      {movieList.map((val) => {
        return (
          <div className="card">
            <h2>
              {val.movieName} | {val.movieReview}
              <button onClick={()=>deleteMovie(val.movieName)}>Delete</button>
              <input type="text" onChange={(e)=>setNewMovieReview(e.target.value)} placeholder="Update Moview Review"/>
              <button onClick={()=>updateMovie(val.movieName)}>Update</button>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
