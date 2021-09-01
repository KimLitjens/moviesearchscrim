import React from 'react'

export default function Cards({ children, ...restProps }) {
    return <div {...restProps} className="grid grid-flow-rows sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">{children}</div>
}
