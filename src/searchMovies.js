import React, { useState, useEffect } from "react"
import MovieCard from './movieCard.js'
import { apiKey } from './apiKey'

export default function SearchMovies() {

    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    const [sortBy, setSortBy] = useState();


    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {

        const sortedMovies = sortBy === "High-Low" ? [...movies].sort((a, b) => b.vote_average - a.vote_average)
            : sortBy === "Low-High" ? [...movies].sort((a, b) => a.vote_average - b.vote_average)
                : sortBy === "ReleaseDate" ? [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) : [...movies].sort((a, b) => a.title.localeCompare(b.title))
        setMovies(sortedMovies)
        console.log(movies[0])
    }, [sortBy])

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="sortMovies">
                <form id="sortForm">
                    Sort by:
            <select id="sortSelect" onChange={(e) => setSortBy(e.target.value)}>
                        <option >---</option>
                        <option value="High-Low">High-Low</option>
                        <option value="Low-High">Low-High</option>
                        <option value="Title">Title</option>
                        <option value="ReleaseDate">Release Date</option>
                    </select>
                </form>
            </div>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}