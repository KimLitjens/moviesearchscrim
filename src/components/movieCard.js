import React from 'react'
import YouTube from 'react-youtube'

export default function MovieCard({ children, ...restProps }) {
    return <div {...restProps} className="flex flex-col px-16 py-8 rounded-xl shadow-2xl mb-8 mr-8 bg-grey text-primary">{children}</div>
}

MovieCard.Title = function Title({ children, ...restProps }) {
    return <h1 {...restProps} className="my-4 -mx-14 text-white text-center">{children}</h1>
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
    return <p {...restProps} className="text-white text-center my-8">{children}</p>
}

MovieCard.Trailer = function Trailer({ children, ...restProps }) {
    return <button {...restProps} className=" bg-primary text-white mt-20 rounded-full py-4 text-3xl ">{children}</button>
}

MovieCard.Overlay = function Overlay({ children, ...restProps }) {
    return <div {...restProps} className="fixed inset-0 bg-secondary bg-opacity-80 z-50 h-screen">{children}</div>
}

MovieCard.Youtube = function Youtube({ children, ...restProps }) {
    return <YouTube {...restProps} className=" m-auto z-50" />
}

MovieCard.Container = function Container({ children, ...restProps }) {
    return <container {...restProps} className="flex h-screen justify-center items-center">{children}</container>
}