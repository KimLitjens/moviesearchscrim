import React from "react";

export default function FilterGenres({ genreId }) {
    return (
        <div>
            <input type="checkbox" /><p><small>{genreId.name}</small></p>
        </div>
    )
}

