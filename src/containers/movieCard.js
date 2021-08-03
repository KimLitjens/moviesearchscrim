import React, { useState, useEffect } from "react";
import { apiKey } from '../apiKey'


export default function MovieCardContainer({ movie }) {
    const channel = movie.media_type === "movie" ? "movie" : "tv"
    const [trailerInfo, setTrailerInfo] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${channel}/${movie.id}/videos?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(response => response.results.find(result => result.type === "Trailer"))
            .then(data => {
                setTrailerInfo(data)
            })
    }, []);

    return (
        <div className="card"  >
            <a href={`https://www.themoviedb.org/${channel}/${movie.id}`} target="_blank">
                <img className="card--image"
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt={movie.title + ' poster'}
                />
            </a>
            <div className="card--content">
                <h3 className="card--title">{movie.title || movie.name}</h3>
                <p><small>RELEASE DATE: {movie.release_date || movie.first_air_date}</small></p>
                <p><small>RATING: {movie.vote_average}</small></p>
                <p className="card--desc">{movie.overview}</p>
                {trailerInfo ? <a href={`https://www.youtube.com/watch?v=${trailerInfo.key}`} target="_blank">Trailer</a> : null}
            </div>
        </div >
    )
}