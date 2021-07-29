import React from 'react';

export default function Header({ children, ...restProps }) {
    return <div {...restProps} >{children}</div>
}

Header.Title = function Title({ children, ...restProps }) {
    return <h1 {...restProps} className="title">{children}</h1>
}