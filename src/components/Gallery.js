import React from "react";
import { Carousel } from "react-bootstrap";
import "../assets/Gallery.css";



function Gallery () {

    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context("../assets/gallery", false, /\.(png|jpe?g|svg)$/));

    return (
        <div className="container">
            <hr/>
            <h2 className="mt-4 gallery-title" id="gallery">Gallery</h2>

            <Carousel className="carousel-container">
                {images.map((image, index) => (
                    <Carousel.Item key={index} className="gallery-carousel">
                        <img src={image} alt={`Gallery ${index + 1}`} />
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>
    );
}

export default Gallery;