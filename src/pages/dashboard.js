import React, { useState, useEffect } from 'react'
import { apiKey } from '../apiKey'
import { HeaderContainer, MovieCardContainer, } from '../containers'
import { Search, Filter, Cards } from '../components'

export default function Dashboard() {
    const [query, setQuery] = useState('');
    const [moviesTvShows, setMoviesTvShows] = useState([]);
    const [filterdMoviesTvShow, setFilterdMoviesTvShow] = useState([])
    const [sortBy, setSortBy] = useState();
    const [channelAt, setChannelAt] = useState();


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

    return (
        <div className="container">
            <HeaderContainer />
            {/* Searchform  */}
            <Search>
                <Search.Form onSubmit={searchMovies}>
                    <Search.Input type="text" name="query"
                        placeholder="Search for a movie or tv show"
                        value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                    <Search.Button type="submit">Search</Search.Button>
                </Search.Form>
            </Search>
            {/* Adjust Search  */}
            <Filter>
                {/* Sort Search */}
                <Filter.Form>
                    <Filter.Label >Sort By:</Filter.Label>
                    <Filter.Select onChange={(e) => setSortBy(e.target.value)}>
                        <option >---</option>
                        <option value="High-Low">High-Low</option>
                        <option value="Low-High">Low-High</option>
                        <option value="Title">Title</option>
                        <option value="NewestFirst">Newest first</option>
                        <option value="OldestFirst">Oldest first</option>
                    </Filter.Select>
                </Filter.Form>
                {/* Filter Search  */}
                <Filter.Form >
                    <Filter.Label>Filter:</Filter.Label>
                    <Filter.Select
                        onChange={(e) => setChannelAt(e.target.value)}
                    >
                        <option value="">---</option>
                        <option value="movies">Movies</option>
                        <option value="tvShows">TV Shows</option>
                    </Filter.Select>
                </Filter.Form>
            </Filter>
            <Cards >
                {filterdMoviesTvShow.map(movie => (
                    <MovieCardContainer movie={movie} key={movie.id} />
                ))}
            </Cards>
        </div>
    )

}