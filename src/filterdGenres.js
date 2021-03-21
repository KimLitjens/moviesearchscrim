import React from "react";

export default function FilterGenres({ genreId }) {
    return (
        <option value={genreId.id}>{genreId.name}</option>
    )
}

