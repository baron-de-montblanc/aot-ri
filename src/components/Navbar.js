import "../assets/Navbar.css";

function NavBar () {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">

                <a className="navbar-brand" href="/">
                    <img className="nav-logo" src="/images/logo.png"/>
                </a>
                <button className="navbar-toggler custom-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav"
                        aria-controls="#navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Events</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Trivia</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Contact</a>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>
    )
}

export default NavBar;