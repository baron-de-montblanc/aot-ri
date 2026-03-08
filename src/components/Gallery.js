import React, {useState, useEffect} from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/Gallery.css";

function Gallery () {
    const [showControls, setShowControls] = useState(window.innerWidth >= 992);
    const [images, setImages] = useState([]);
        
    useEffect(() => {
        const handleResize = () => setShowControls(window.innerWidth >= 992);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        }, []);

    useEffect(() => {
        fetch("/data/gallery.json")
            .then(res => res.json())
            .then(data => {
            const sorted = data.captions
                .filter(item => item.display)
                .sort((a, b) => b.img.localeCompare(a.img)); // reverse alphabetical

            setImages(sorted);
            });
        }, []);
        
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
                    className="gallery-swiper desktop"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id} className="gallery-swiper-slide">
                        <div className="gallery-image-frame" style={{paddingBottom:"50px"}}>
                            <img src={image.img} alt={image.caption} className="gallery-image desktop" />
                            <h1 className="gallery-image-caption">
                                {image.caption}
                            </h1>
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
                    className="gallery-swiper mobile"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="gallery-swiper-slide">
                        <div className="gallery-image-frame">
                            <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image mobile" />
                            <h1 className="gallery-image-caption">
                                Caption
                            </h1>
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