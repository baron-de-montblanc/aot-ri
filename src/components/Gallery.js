import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/Gallery.css";

/**
 * Deterministic scatter. Each print takes a tilt, a sideways nudge and a width
 * from its position in the wall, so the collage is irregular but identical on
 * every render — a random() here would reshuffle the wall on each state change.
 *
 * Prints lean into their neighbours sideways (a transform, so layout is
 * untouched) and the columns start at different heights. Nothing overlaps
 * vertically, which keeps every caption readable.
 */
const TILT = [-4.2, 2.6, -1.5, 4.8, -3.1, 1.4, -2.4, 3.7, -1.1, 2.2, -4.6, 3.0];
const NUDGE = [-5, 11, -9, 7, -12, 4, 10, -8, 3, -9, 8, -4];
const WIDTH = [100, 93, 98, 90, 100, 95, 97, 91, 100, 94, 99, 92];
const COLUMN_OFFSET = [0, 58, 24, 76];

const columnCount = (width) => (width >= 992 ? 3 : width >= 600 ? 2 : 1);

/** Deal the photos across columns like cards, so reading order stays left to right. */
const dealIntoColumns = (photos, count) => {
  const columns = Array.from({ length: count }, () => []);
  photos.forEach((photo, index) => columns[index % count].push({ photo, index }));
  return columns;
};

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [columns, setColumns] = useState(() => columnCount(window.innerWidth));
  const [swiper, setSwiper] = useState(null);
  const [position, setPosition] = useState({ isBeginning: true, isEnd: false });
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.captions
          .filter((item) => item.display)
          .sort((a, b) => b.img.localeCompare(a.img)); // reverse alphabetical
        setPhotos(sorted);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => setColumns(columnCount(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [openIndex, close, step]);

  const open = (index, event) => {
    lastFocused.current = event.currentTarget;
    setOpenIndex(index);
  };

  const current = openIndex === null ? null : photos[openIndex];
  // One column means a phone: show a single print at a time with arrows,
  // the same way the past events band works.
  const isCarousel = columns === 1;

  const Print = ({ photo, index, scattered = true }) => (
    <figure
      className={`print ${scattered ? "" : "print-single"}`}
      style={
        scattered
          ? {
              "--tilt": `${TILT[index % TILT.length]}deg`,
              "--nudge": `${NUDGE[index % NUDGE.length]}px`,
              "--width": `${WIDTH[index % WIDTH.length]}%`,
              "--pull": index % 3 === 1 ? "auto" : "0",
            }
          : { "--tilt": `${TILT[index % TILT.length] / 2.5}deg` }
      }
    >
      <button type="button" className="print-btn" onClick={(e) => open(index, e)}>
        <img src={photo.img} alt={photo.caption} loading="lazy" />
        <span className="visually-hidden">View full size</span>
      </button>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );

  return (
    <section className="band band-light gallery-band" id="gallery">
      <div className="band-inner">
        <div className="section-head">
          <h2 className="section-title">Gallery</h2>

          {isCarousel && (
            <div className="carousel-nav">
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={() => swiper?.slidePrev()}
                disabled={position.isBeginning}
                aria-label="Previous photo"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                type="button"
                className="carousel-nav-btn"
                onClick={() => swiper?.slideNext()}
                disabled={position.isEnd}
                aria-label="Next photo"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>

        <p className="section-lead">
          Talks, trivia and a room full of people arguing about black holes over a pint. Pick any
          photo to see it full size.
        </p>

        {isCarousel ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            speed={300}
            threshold={3}
            resistance
            resistanceRatio={0.85}
            onSwiper={setSwiper}
            onSlideChange={(sw) => setPosition({ isBeginning: sw.isBeginning, isEnd: sw.isEnd })}
            className="gallery-swiper"
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo.id ?? photo.img}>
                <Print photo={photo} index={index} scattered={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="gallery-wall">
            {dealIntoColumns(photos, columns).map((column, columnIndex) => (
              <div
                className="gallery-column"
                key={columnIndex}
                style={{ "--column-offset": `${COLUMN_OFFSET[columnIndex] ?? 0}px` }}
              >
                {column.map(({ photo, index }) => (
                  <Print key={photo.id ?? photo.img} photo={photo} index={index} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button type="button" className="lightbox-close" onClick={close} ref={closeRef} aria-label="Close">
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <button
            type="button"
            className="lightbox-step prev"
            onClick={() => step(-1)}
            aria-label="Previous photo"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <figure className="lightbox-figure">
            <img src={current.img} alt={current.caption} />
            <figcaption>{current.caption}</figcaption>
          </figure>

          <button
            type="button"
            className="lightbox-step next"
            onClick={() => step(1)}
            aria-label="Next photo"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
