import React, { useState } from 'react'
import { apiKey } from '../apiKey'
import { Search } from '../components'


export default function SearchContainer() {
    const [query, setQuery] = useState('');



    return (
        <Search.Form>
            <form className="movieName">
                <input className="input" type="text" name="query"
                    placeholder="Search for a movie or tv show"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <Search.Button type="submit">Search</Search.Button>
            </form>
        </Search.Form>
    )
}
