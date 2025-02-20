import "../assets/Home.css";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Events from "./Events";
import About from "./About";
import Trivia from "./Trivia";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Faq from "./Faq";


function Intro () {
    return (
        <div className="container">
            <div className="row text-center mt-4 intro-content">

                <div className="col-6">
                    <div className="home-title">
                        <h1>Astronomy on Tap</h1>
                        <h2>Rhode Island</h2>
                    </div>
                    <div>
                        <img
                            src="/images/promo/promo1.JPG"
                            alt="Astronomy on Tap Rhode Island Promo 1"
                            className="promo-image"
                        />
                    </div>
                </div>

                <div className="col-6">
                    <div>
                        <img 
                            src="/images/promo/promo2.JPG"
                            alt="Astronomy on Tap Rhode Island Promo 2"
                            className="promo-image"
                        />
                    </div>

                    <div className="row intro-text">
                        <div className="col-12">
                            <p>
                                Join Astronomy on Tap Rhode Island for drinks, cosmic trivia, and engaging talks!
                                We meet at least twice per semester, and events are free and open to all 
                                ages. Grab a drink, test your space knowledge, and explore the universe with us! 
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Home () {
    return (
        <>

            <NavBar/>

            <Intro/>
            
            <div className="home-content">
                <Events />
            </div>

            <Trivia />

            <Gallery />

            <Faq />

            <About />

            <Contact />

            <Footer />

        </>
    )
}

export default Home;