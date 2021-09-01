import React from 'react'

export default function Filter({ children, ...restProps }) {
    return <div {...restProps} className="flex flex-col lg:flex-row justify-center">{children}</div>
}

Filter.Label = function Label({ children, ...restProps }) {
    return <h3 {...restProps} className="uppercase mb-1 mr-1">{children}</h3>
}

Filter.Form = function Form({ children, ...restProps }) {
    return <form {...restProps} className="flex">{children}</form>
}

Filter.Select = function Select({ children, ...restProps }) {
    return <select {...restProps}
        className="text-secondary leading-10 border rounded-3xl mb-4 px-8 py-2 mr-2.5">{children}</select>
}