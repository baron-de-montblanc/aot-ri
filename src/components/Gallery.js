import React, {useState, useEffect} from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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


                {showControls ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    spaceBetween={24}
                    speed={400}
                    grabCursor={false}
                    simulateTouch={false}
                    followFinger={false}
                    threshold={6}
                    className="past-events-swiper desktop"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="gallery-swiper-slide">
                        <div className="gallery-image-frame">
                            <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image-desktop" />
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                ) : (
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    spaceBetween={16}
                    speed={300}
                    simulateTouch={true}
                    followFinger={true}
                    threshold={3}
                    resistance={true}
                    resistanceRatio={0.85}
                    className="past-events-swiper mobile"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="gallery-swiper-slide">
                        <div className="gallery-image-frame">
                            <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image-mobile" />
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                )}
            </div>
        </div>
    );
}

export default Gallery;