import "../assets/Home.css";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Events from "./Events";

function Home () {
    return (
        <div className="content-container">

            <NavBar />

            <div id="top" className="home-title">
                <h1>Astronomy on Tap</h1>
                <h2>Rhode Island</h2>
            </div>
            
            <div className="home-content">
                <Events />
            </div>

            <Footer />

        </div>
    )
}

export default Home;