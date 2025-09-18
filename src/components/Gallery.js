import React, {useState, useEffect} from "react";
import { Carousel } from "react-bootstrap";
import "../assets/Gallery.css";



function Gallery () {
    const [showControls, setShowControls] = useState(window.innerWidth >= 992);
        
    useEffect(() => {
        const handleResize = () => setShowControls(window.innerWidth >= 992);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        }, []);

    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context("../assets/gallery", false, /\.(png|jpe?g|svg|JPG|HEIC)$/));

    return (
        <div className="gallery-content">
            <div className="container row text-center">
                <h2 className="mt-4 gallery-title-h2" id="gallery">Gallery</h2>

                <p className="gallery-p">
                    Take a look at some memorable moments from past Astronomy on Tap Rhode Island events! 
                    From engaging talks by astronomers to fun trivia nights and lively discussions over drinks, 
                    these photos capture the excitement of bringing space science to the community. 
                    Scroll through and relive the experience!
                </p>

                <Carousel 
                    className="carousel-container"
                    interval={null} 
                    controls={showControls} 
                    indicators={true} 
                    keyboard={false}
                >
                    {images.map((image, index) => (
                        <Carousel.Item key={index} className="gallery-carousel">
                            <img src={image} alt={`Gallery ${index + 1}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>

            </div>
        </div>
    );
}

export default Gallery;