import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <div className = "header">
            <header>
                <div className="container">
                    <Link to ="/">
                        <h1>Workout Buddy</h1>
                    </Link>
                    <nav>
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