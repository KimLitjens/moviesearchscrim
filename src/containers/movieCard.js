import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom'
import { apiKey } from '../apiKey'
import { MovieCard } from '../components'


export default function MovieCardContainer({ movie }) {
    const channel = movie.media_type === "movie" ? "movie" : "tv"
    const [trailerInfo, setTrailerInfo] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${channel}/${movie.id}/videos?api_key=${apiKey}&language=en-US`)
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
                    <MovieCard.Youtube videoId={trailerInfo.key} opts={opts} />
                </MovieCard.Overlay>,
                document.body) : null}

            {/* {trailerInfo ? <MovieCard.Trailer href={`https://www.youtube.com/watch?v=${trailerInfo.key}`} target="_blank">Trailer</MovieCard.Trailer> : null} */}
            {/* <MovieCard.Trailer href={`https://www.youtube.com/watch?v=${trailerInfo.key}`} target="_blank">Trailer</MovieCard.Trailer> : null} */}
        </MovieCard>
    )
}