import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }

    return(
        <div className = "header">
            <header>
                <div className="container">
                    <Link to ="/">
                        <h1>Workout Buddy</h1>
                    </Link>
                    <nav>
                        <div>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                        <div>
                            <Link to = "/login">Login</Link>
                            <Link to = "/signup">Sign Up</Link>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Navbar