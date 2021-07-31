import React from 'react'

export default function Filter({ children, ...restProps }) {
    return <div {...restProps} className="flex">{children}</div>
}

Filter.Label = function Label({ children, ...restProps }) {
    return <h1 {...restProps} className="text-4xl uppercase mb-1 mr-1">{children}</h1>
}

Filter.Form = function Form({ children, ...restProps }) {
    return <form {...restProps} className="flex">{children}</form>
}

Filter.Select = function Select({ children, ...restProps }) {
    return <select {...restProps}
        className="text-2xl text-secondary leading-10 border rounded-3xl mb-4 px-8 py-2 mr-2.5">{children}</select>
}