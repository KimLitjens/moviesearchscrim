import React, { useState, useEffect } from "react"
import MovieCard from './movieCard.js'
import { apiKey } from './apiKey'

export default function SearchMovies() {

    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [moviesTvShows, setMoviesTvShows] = useState([]);
    const [filterdMoviesTvShow, setFilterdMoviesTvShow] = useState([])
    const [sortBy, setSortBy] = useState();
    const [channelAt, setChannelAt] = useState();



    const searchMovies = async (e) => {
        e.preventDefault();

        const url = query === "popular" ? `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
            : `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setMoviesTvShows(data.results.filter(movie => movie.poster_path))
            setFilterdMoviesTvShow(data.results.filter(movie => movie.poster_path))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const sortedMovies = sortBy === "High-Low" ? [...moviesTvShows].sort((a, b) => b.vote_average - a.vote_average)
            : sortBy === "Low-High" ? [...moviesTvShows].sort((a, b) => a.vote_average - b.vote_average)
                : sortBy === "NewestFirst" ? [...moviesTvShows].sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date))
                    : sortBy === "OldestFirst" ? [...moviesTvShows].sort((a, b) => new Date(a.release_date || a.first_air_date) - new Date(b.release_date || b.first_air_date))
                        : [...moviesTvShows].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name))
        setFilterdMoviesTvShow(sortedMovies)
    }, [sortBy])

    useEffect(() => {
        const selectedChannel = channelAt === "movies" ? [...moviesTvShows].filter(movie => movie.media_type === "movie")
            : channelAt === "tvShows" ? [...moviesTvShows].filter(movie => movie.media_type === "tv")
                : [...moviesTvShows]
        setFilterdMoviesTvShow(selectedChannel)
    }, [channelAt])

    // console.table(filterdMoviesTvShow.map(e => `Release date ${e.release_date || e.first_air_date} ${e.media_type} Name ${e.name || e.title} `))
    return (
        <>
            {/* Searchform  */}
            <div className="searchForm">
                <form className="movieName" onSubmit={searchMovies}>
                    <input className="input" type="text" name="query"
                        placeholder="Search for a movie or tv show"
                        value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="button" type="submit">Search</button>
                </form>
            </div>
            {/* Adjust Search  */}
            <div className="adjustSearch">
                <form id="sortForm">
                    <label className="label">Sort By:</label>
                    <select className="input" id="sortSelect" onChange={(e) => setSortBy(e.target.value)}>
                        <option >---</option>
                        <option value="High-Low">High-Low</option>
                        <option value="Low-High">Low-High</option>
                        <option value="Title">Title</option>
                        <option value="NewestFirst">Newest first</option>
                        <option value="OldestFirst">Oldest first</option>
                    </select>
                </form>
                <form className="selectSearch">
                    <label className="label" >Filter</label>
                    <select className="input" id="channelFilter"
                        onChange={(e) => setChannelAt(e.target.value)}
                    >
                        <option value="">---</option>
                        <option value="movies">Movies</option>
                        <option value="tvShows">TV Shows</option>
                    </select>
                </form>
            </div>
            {/* Display Search */}
            <div className="card-list">
                {filterdMoviesTvShow.map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}