export default function sortMovies() {
    return (
        <div className="sortMovies">
            <form id="sortForm">
                Sort by:
            <select name="" id="sortSelect">
                    <option >---</option>
                    <option value="High-Low">High-Low</option>
                    <option value="Low-High">Low-High</option>
                    <option value="Name">Name</option>
                </select>
            </form>
        </div>
    )
}



