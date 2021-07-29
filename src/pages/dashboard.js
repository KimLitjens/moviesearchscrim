import SearchMovies from '../searchMovies'
import { HeaderContainer, SearchContainer, } from '../containers'

export default function Dashboard() {
    return (
        <div className="container">
            <HeaderContainer />
            <SearchContainer />
            <SearchMovies />
        </div>
    )

}