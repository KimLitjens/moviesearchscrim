import React from "react";

export default function FilterGenres({ genreId }) {
    return (
        <div className="genreChecbox">
            <input type="checkbox" /><label>{genreId.name}</label>
        </div>
    )
}

