import React, { useState } from 'react'
import { apiKey } from '../apiKey'
import { Search } from '../components'


export default function SearchContainer() {
    const [query, setQuery] = useState('');
    const [moviesTvShows, setMoviesTvShows] = useState([]);
    const [filterdMoviesTvShow, setFilterdMoviesTvShow] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = query === "popular" ? `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
            : /\d{4}/.test(parseInt(query)) ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${query}`
                : `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            fetch(url)
                .then(response => response.json())
                .then(response => response.results.filter(movie => movie.poster_path))
                .then(response => {
                    setMoviesTvShows(response)
                    setFilterdMoviesTvShow(response)
                })
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Search.Form>
            <form className="movieName" onSubmit={searchMovies}>
                <input className="input" type="text" name="query"
                    placeholder="Search for a movie or tv show"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <Search.Button type="submit">Search</Search.Button>
            </form>
        </Search.Form>
    )
}
