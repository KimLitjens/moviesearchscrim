import React, { useState } from 'react'

export default function FilterContainer() {
    const [sortBy, setSortBy] = useState();
    const [channelAt, setChannelAt] = useState();

    return (
        <div className="adjustSearch">
            {/* Sort Search */}
            <form id="sortForm">
                <label className="label">Sort By:</label>
                <select className="input" id="sortSelect" onChange={(e) => setSortBy(e.target.value)}>
                    <option >---</option>
                    <option value="High-Low">High-Low</option>
                    <option value="Low-High">Low-High</option>
                    <option value="Title">Title</option>
                    <option value="NewestFirst">Newest first</option>
                    <option value="OldestFirst">Oldest first</option>
                </select>
            </form>
            {/* Filter Search  */}
            <form className="selectSearch">
                <label className="label" >Filter</label>
                <select className="input" id="channelFilter"
                    onChange={(e) => setChannelAt(e.target.value)}
                >
                    <option value="">---</option>
                    <option value="movies">Movies</option>
                    <option value="tvShows">TV Shows</option>
                </select>
            </form>
        </div>
    )
}
