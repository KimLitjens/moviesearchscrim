import React from 'react'

export default function Footer({ children, ...restProps }) {
    return <p {...restProps} className="text-2xl">{children}</p>
}

Footer.Link = function Link({ children, ...restProps }) {
    return <a {...restProps} className="text-2xl">{children}</a>
}