import React, { useState } from 'react'
import { MovieCard } from '../containers'

export default function CardsContainer() {
    const [filterdMoviesTvShow, setFilterdMoviesTvShow] = useState()

    return (
        <div className="card-list">
            {filterdMoviesTvShow.map(movie => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
    )
}
