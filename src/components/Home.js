import "../assets/Home.css";
import NavBar from "./Navbar";
import Footer from "./Footer";

function Home () {
    return (
        <div className="container content-container">

            <NavBar />

            <div className="home-title">
                <h1>Astronomy on Tap</h1>
                <h2>Rhode Island</h2>
            </div>
            <div className="home-content">
                Content goes here
            </div>

            <Footer />

        </div>
    )
}

export default Home;