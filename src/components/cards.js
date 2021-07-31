import React from 'react'

export default function Cards({ children, ...restProps }) {
    return <div {...restProps} className="grid grid-flow-rows grid-cols-3 grid-rows-3 gap-4 mt-16 ">{children}</div>
}
