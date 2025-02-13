import "../assets/Home.css";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Events from "./Events";
import About from "./About";
import Trivia from "./Trivia";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Faq from "./Faq";

function Home () {
    return (
        <div className="content-container">

            <NavBar/>

            <div className="home-title">
                <h1>Astronomy on Tap</h1>
                <h2>Rhode Island</h2>
            </div>

            <div className="container home-intro text-center">
                <p>
                    Join us for engaging talks, cosmic trivia, and a fun atmosphere! 
                    We meet bi-semesterly, and our events are free and open to all ages. 
                    Come grab a drink, test your space knowledge, and explore the universe with us!
                </p>
            </div>
            
            <div className="home-content">
                <Events />
            </div>

            <Trivia />

            <Gallery />

            <Faq />

            <About />

            <Contact />

            <Footer />

        </div>
    )
}

export default Home;