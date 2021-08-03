import React from 'react'

export default function MovieCard({ children, ...restProps }) {
    return <div {...restProps} className="px-16 py-8 rounded-xl shadow-2xl mb-8 mr-8 bg-grey text-primary justify-center">{children}</div>
}

MovieCard.Title = function Title({ children, ...restProps }) {
    return <h3 {...restProps} className="my-4 text-5xl text-center">{children}</h3>
}

MovieCard.Image = function Image({ children, ...restProps }) {
    return <img {...restProps} className="mx-auto my-0" />
}

MovieCard.Link = function Link({ children, ...restProps }) {
    return <a {...restProps}>{children}</a>
}

MovieCard.ReleaseDate = function ReleaseDate({ children, ...restProps }) {
    return <p {...restProps} className=" text-center">{children}</p>
}

MovieCard.Rating = function Rating({ children, ...restProps }) {
    return <p {...restProps} className=" text-center">{children}</p>
}

MovieCard.Overview = function Overview({ children, ...restProps }) {
    return <p {...restProps} className="text-white text-center mb-8">{children}</p>
}

MovieCard.Trailer = function Trailer({ children, ...restProps }) {
    return <a {...restProps} className="bg-primary text-white mt-20 rounded-full px-16 py-4 text-3xl ">{children}</a>
}