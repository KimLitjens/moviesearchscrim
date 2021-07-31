import React from 'react'

export default function Search({ children, ...restProps }) {
    return <div {...restProps} className="mb-5 text-secondary">{children}</div>
}

Search.Form = function Search({ children, ...restProps }) {
    return <form {...restProps} className="mb-5">{children}</form>
}

Search.Button = function Search({ children, ...restProps }) {
    return <button {...restProps}
        className="hover:opacity-75 bg-primary text-2xl px-8 py-4 ml-2 rounded-full">{children}</button>
}

Search.Input = function Input({ children, ...restProps }) {
    return <input {...restProps} className="text-2xl leading-10 border rounded-3xl mb-4 px-8 py-2 mr-2.5 w-5/6">{children}</input>
}