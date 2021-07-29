import React from 'react'

export default function Search({ children, ...restProps }) {
    return <div {...restProps} >{children}</div>
}

Search.Form = function Search({ children, ...restProps }) {
    return <h1 {...restProps} className="mb-5">{children}</h1>
}

Search.Button = function Search({ children, ...restProps }) {
    return <button {...restProps}
        className="hover:opacity-75 bg-primary text-secondary text-2xl px-8 py-4 ml-2 rounded-full">{children}</button>
}