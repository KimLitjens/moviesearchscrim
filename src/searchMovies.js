import react from "react"

export default function searchMovie() {
    return (
        <form className="form">
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query"
                placeholder="i.e. Jurassic Park" />
            <button className="button" type="submit">Search</button>
        </form>
    )
}