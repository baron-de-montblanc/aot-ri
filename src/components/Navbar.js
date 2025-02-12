import "../assets/Navbar.css";

function NavBar () {
    return (
        <div>
            <div id="top" className="container">
                <nav className="navbar navbar-expand-lg">

                    <a className="navbar-brand" href="/">
                        <img 
                            className="nav-logo" 
                            src="/images/logo.png"
                            alt="Site logo"
                            />
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
                                <a className="nav-link" href="#events">Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#trivia">Trivia</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#gallery">Gallery</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Contact</a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;