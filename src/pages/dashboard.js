import SearchMovies from '../searchMovies'
import { HeaderContainer } from '../containers'

export default function Dashboard() {
    return (
        <div className="container">
            <HeaderContainer />
            <SearchMovies />
        </div>
    )

}