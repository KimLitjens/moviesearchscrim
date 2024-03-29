import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom'
import { MovieCard } from '../components'


export default function MovieCardContainer({ movie }) {
    const channel = movie.media_type === "tv" ? "tv" : "movie"
    const [trailerInfo, setTrailerInfo] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const API_SECRET = process.env.REACT_APP_API_SECRET

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${channel}/${movie.id}/videos?api_key=${API_SECRET}&language=en-US`)
            .then(response => response.json())
            .then(response => response.results.find(result => result.type === "Trailer"))
            .then(data => {
                setTrailerInfo(data)
            })
    }, []);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    }


    return (
        <MovieCard  >
            <MovieCard.Link href={`https://www.themoviedb.org/${channel}/${movie.id}`} target="_blank">
                <MovieCard.Image
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt={movie.title + ' poster'}
                />
            </MovieCard.Link>
            <MovieCard.Title>{movie.title || movie.name}</MovieCard.Title>
            <MovieCard.ReleaseDate><small>RELEASE DATE: {movie.release_date || movie.first_air_date}</small></MovieCard.ReleaseDate>
            <MovieCard.Rating><small>RATING: {movie.vote_average}</small></MovieCard.Rating>
            <MovieCard.Overview>{movie.overview}</MovieCard.Overview>
            {trailerInfo ? <MovieCard.Trailer onClick={() => setIsOpen(true)} >Trailer</MovieCard.Trailer> : null}
            {isOpen ? ReactDom.createPortal(
                <MovieCard.Overlay onClick={() => setIsOpen(false)}>
                    <MovieCard.Container>
                        {/* <MovieCard.YoutubeContainer> */}
                        <MovieCard.Youtube videoId={trailerInfo.key} opts={opts} />
                        {/* </MovieCard.YoutubeContainer> */}
                    </MovieCard.Container>
                </MovieCard.Overlay>,
                document.body) : null}
        </MovieCard>
    )
}