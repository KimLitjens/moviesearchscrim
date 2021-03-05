import React from 'react'
import ReactDOM from 'react-dom'
import SearchMovies from "./searchMovies"
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="title">My Movie Search</h1>
      <SearchMovies />
    </div>
  );
}

export default App;
