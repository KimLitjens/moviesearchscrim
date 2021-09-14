import React, { useState, useEffect } from 'react'
import { HeaderContainer, MovieCardContainer, } from '../containers'
import { Search, Filter, Cards, Footer } from '../components'
import { allGenres } from '../allGenres'

export default function Dashboard() {
    const [query, setQuery] = useState('');
    const [moviesTvShows, setMoviesTvShows] = useState([]);
    const [filterdMoviesTvShow, setFilterdMoviesTvShow] = useState([])
    const [sortBy, setSortBy] = useState();
    const [channelAt, setChannelAt] = useState();
    const [usedGenres, setUsedGenres] = useState([])
    const [selectedGenreId, setSelectedGenreId] = useState()


    const searchMovies = async (e) => {
        e.preventDefault();

        const url = "/.netlify/functions/fetchMovies"
        try {
            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    query: query,
                }),
            }).then((response) => response.json())
                .then(response => response.data.filter(movie => movie.poster_path))
                .then(response => {
                    setMoviesTvShows(response)
                    setFilterdMoviesTvShow(response)
                });
        } catch (err) {
            console.error(err);
        }

        const filterByType = document.getElementById("filterByType");
        filterByType.selectedIndex = 0;

        const sortBy = document.getElementById("sortBy");
        sortBy.selectedIndex = 0;

        const filterByGenre = document.getElementById("filterByGenre");
        filterByGenre.selectedIndex = 0;
    }

    useEffect(() => {
        let sortedMovies

        if (sortBy === "High-Low") {
            sortedMovies = [...filterdMoviesTvShow].sort((a, b) => b.vote_average - a.vote_average)
        } else if (sortBy === "Low-High") {
            sortedMovies = [...filterdMoviesTvShow].sort((a, b) => a.vote_average - b.vote_average)
        } else if (sortBy === "NewestFirst") {
            sortedMovies = [...filterdMoviesTvShow].sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date))
        } else if (sortBy === "OldestFirst") {
            sortedMovies = [...filterdMoviesTvShow].sort((a, b) => new Date(a.release_date || a.first_air_date) - new Date(b.release_date || b.first_air_date))
        } else if (sortBy === "Title") {
            [...filterdMoviesTvShow].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name))
        } else {
            sortedMovies = [...filterdMoviesTvShow]
        }

        setFilterdMoviesTvShow(sortedMovies)

    }, [sortBy])

    useEffect(() => {
        let selectedChannel

        if (channelAt === "movies") {
            selectedChannel = [...moviesTvShows].filter(movie => movie.media_type === "movie")
        } else if (channelAt === "tvShows") {
            selectedChannel = [...moviesTvShows].filter(movie => movie.media_type === "tv")
        } else {
            selectedChannel = [...moviesTvShows]
        }

        const filterdByGenre = !!selectedGenreId ? [...selectedChannel].filter(i => i.genre_ids.includes(parseInt(selectedGenreId))) : [...selectedChannel]

        setFilterdMoviesTvShow(filterdByGenre)
    }, [channelAt, selectedGenreId])

    useEffect(() => {
        let genreIds = []

        moviesTvShows.map(e => genreIds = genreIds.concat(e.genre_ids))

        const usedGenres = allGenres.filter(g => genreIds.includes(g.id))

        setUsedGenres(usedGenres)
    }, [filterdMoviesTvShow])

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
                    <Filter.Select id="sortBy" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">---</option>
                        <option value="High-Low">High-Low</option>
                        <option value="Low-High">Low-High</option>
                        <option value="Title">Title</option>
                        <option value="NewestFirst">Newest first</option>
                        <option value="OldestFirst">Oldest first</option>
                    </Filter.Select>
                </Filter.Form>
                {/* Filter Search  */}
                <Filter.Form >
                    <Filter.Label>Type:</Filter.Label>
                    <Filter.Select id="filterByType"
                        onChange={(e) => setChannelAt(e.target.value)}
                    >
                        <option value="">---</option>
                        <option value="movies">Movies</option>
                        <option value="tvShows">TV Shows</option>
                    </Filter.Select>
                </Filter.Form>
                {/* Filter Genre  */}
                <Filter.Form>
                    <Filter.Label>Genre:</Filter.Label>
                    <Filter.Select id="filterByGenre"
                        onChange={(e) => setSelectedGenreId(e.target.value)}>
                        <option value="">---</option>
                        {usedGenres.map(g => <option value={g.id}>{g.name}</option>)}
                    </Filter.Select>
                </Filter.Form>
            </Filter>
            <Cards >
                {filterdMoviesTvShow.map(movie => (
                    <MovieCardContainer movie={movie} key={movie.id} />
                ))}
            </Cards>
            {filterdMoviesTvShow.length > 0 ? <Footer><Footer.Link href="https://www.themoviedb.org/" target="_blank">*This product uses the TMDb API but is not endorsed or certified by TMDb</Footer.Link>.</Footer>
                : null}
        </div>
    )

}