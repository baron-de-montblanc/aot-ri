import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarDay,
  faChevronLeft,
  faChevronRight,
  faClock,
  faLocationDot,
  faMapLocationDot,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { formatInTimeZone } from "date-fns-tz";
import AddToCalendar from "./AddToCalendar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/Events.css";

function NoNextEvent() {
  return (
    <div className="event-header">
      <h2 className="event-badge">Upcoming event</h2>

      <div className="event-card event-card-upcoming no-next-event">
        <div className="event-card-body">
          <h3 className="event-title">Nothing on the calendar yet</h3>
          <p className="no-next-event-copy">
            The next Astronomy on Tap Rhode Island night has not been announced. Follow along and
            you will hear about it first.
          </p>

          <div className="social-container">
            <a
              href="https://www.instagram.com/aotri24/"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="fa-icon" />
            </a>
            <a
              href="https://www.linkedin.com/company/astronomy-on-tap-rhode-island/"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="fa-icon" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61564387694241"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="fa-icon" />
            </a>
          </div>
        </div>

        <div className="no-next-event-art">
          <img alt="" src="/images/rocket.png" className="rocket-image" />
        </div>
      </div>
    </div>
  );
}


const TIME_ZONE = "America/New_York";

/**
 * Header for the upcoming event: details on one side, a clickable map card on
 * the other. The whole map is a single link to Google Maps (the embed itself is
 * not interactive) so it is easy to hit on both desktop and touch screens.
 */
const NextEventHeader = ({ event }) => {
  const start = new Date(event.date);
  const address = [event.address?.line1, event.address?.line2].filter(Boolean).join(", ");
  const destination = [event.location, address].filter(Boolean).join(", ");
  const query = encodeURIComponent(destination);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  // Built from the address rather than the stored `iframesrc`: a query-based
  // embed keeps the venue pin centered at any card size, while the saved embed
  // has a fixed center that crops the pin out on narrow screens.
  const embedUrl = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;

  const lineup = [1, 2]
    .filter((i) => event.speaker?.[`speaker${i}`])
    .map((i) => `${event.talkTitle?.[`title${i}`]} — ${event.speaker[`speaker${i}`]}`)
    .join("\n");
  const calendarDescription = [
    `Astronomy on Tap Rhode Island at ${event.location}.`,
    lineup,
    "Free talks, trivia and drinks — all ages welcome.",
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <div className="event-header">
      <h2 className="event-badge">Upcoming event</h2>

      <div className="event-card event-card-upcoming">
        <div className="event-card-body">
          <h3 className="event-title">{event.title}</h3>

          <ul className="event-meta">
            <li>
              <FontAwesomeIcon icon={faCalendarDay} className="event-meta-icon" />
              <span className="event-meta-primary">
                {formatInTimeZone(start, TIME_ZONE, "EEEE, MMMM d, yyyy")}
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} className="event-meta-icon" />
              <span className="event-meta-primary">
                {formatInTimeZone(start, TIME_ZONE, "h:mm a zzz")}
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faLocationDot} className="event-meta-icon" />
              <span>
                <span className="event-meta-primary">{event.location}</span>
                {address && <span className="event-meta-secondary">{address}</span>}
              </span>
            </li>
          </ul>

          <div className="event-actions">
            <AddToCalendar
              title={`${event.title} — Astronomy on Tap Rhode Island`}
              description={calendarDescription}
              location={destination}
              start={start}
            />
            <a className="directions-link" href={directionsUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faRoute} />
              Get directions
            </a>
          </div>
        </div>

        <a
          className="map-card"
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${event.location} in Google Maps`}
        >
          <span className="map-frame-wrap">
            <iframe
              src={embedUrl}
              title={`Map to ${event.location}`}
              className="map-frame"
              loading="lazy"
              tabIndex={-1}
            />
          </span>
          <span className="map-cta">
            <FontAwesomeIcon icon={faMapLocationDot} />
            Open in Google Maps
          </span>
        </a>
      </div>
    </div>
  );
};


/**
 * Header for a past event. Same badge/card vocabulary as the upcoming event so
 * the two bands read as siblings; it carries a date and venue instead of a map
 * and calendar actions, which a finished event has no use for.
 */
const PastEventHeader = ({ event }) => {
  const start = new Date(event.date);
  const address = [event.address?.line1, event.address?.line2].filter(Boolean).join(", ");

  return (
    <div className="event-card event-card-past">
      <div className="event-card-body">
        <h3 className="event-title">{event.title}</h3>
      </div>

      <ul className="event-meta event-meta-inline">
        <li>
          <FontAwesomeIcon icon={faCalendarDay} className="event-meta-icon" />
          <span className="event-meta-primary">
            {formatInTimeZone(start, TIME_ZONE, "MMMM d, yyyy")}
          </span>
        </li>
        <li>
          <FontAwesomeIcon icon={faLocationDot} className="event-meta-icon" />
          <span>
            <span className="event-meta-primary">{event.location}</span>
            {address && <span className="event-meta-secondary">{address}</span>}
          </span>
        </li>
      </ul>
    </div>
  );
};


const Event = ({ event, isNextEvent = false }) => {
    const { speaker, speakerTitle, institution, department, talkTitle, photoPath } = event;
  
    // Normalize speakers into an array of up to two entries
    const speakers = [1, 2]
      .filter((i) => speaker[`speaker${i}`])
      .map((i) => ({
        idx: i,
        name: speaker[`speaker${i}`],
        title: speakerTitle?.[`title${i}`],
        institution: institution?.[`ins${i}`],
        department: department?.[`dep${i}`],
        talkTitle: talkTitle?.[`title${i}`],
        photo: photoPath?.[`photo${i}`],
      }));
  
    const MobileSpeaker = ({ spk }) => (
      <div className="mobile-speaker">
        <h3 className="talk-title mobile">{spk.talkTitle}</h3>
        <img src={spk.photo} alt={spk.name} className="speaker-photo" />
        <h4 className="speaker-name">
          {spk.title} {spk.name}
        </h4>
        <p className="speaker-department">{spk.institution}</p>
      </div>
    );

    const MobileLayout = () => (
      <div className={`d-flex flex-column d-md-none align-items-center event-container event-speakers`}>


        {speakers.map((spk) => (
          <MobileSpeaker key={spk.idx} spk={spk} />
        ))}
      </div>
    );
  
    const DesktopLayout = () => (
      <div className={`d-none d-md-block event-container`}>
        <div className="event-speakers">
          {speakers.length === 1 ? (
            // Single speaker
            <div className="row align-items-center single-speaker-div">
              <div className="col-5">
                <img src={speakers[0].photo} alt={speakers[0].name} className="speaker-photo" />
              </div>
              <div className="col-7 text-center">
                <h4 className="speaker-name">
                  {speakers[0].title} {speakers[0].name}
                </h4>
                <p className="speaker-department">
                  {speakers[0].department ? `${speakers[0].department}, ` : ""}
                  {speakers[0].institution}
                </p>
                <h3 className="talk-title">{speakers[0].talkTitle}</h3>
              </div>
            </div>
          ) : (
            // Two speakers
            <div className="row align-items-center">
              <div className="col-4 text-center">
                <h3 className="talk-title top">{speakers[0].talkTitle}</h3>
                <img src={speakers[0].photo} alt={speakers[0].name} className="speaker-photo" />
              </div>
              <div className="col-4">
                <div className="speaker-name-div top text-end">
                  <h4 className="speaker-name">
                    {speakers[1].title} {speakers[1].name}
                  </h4>
                  <p className="speaker-department">
                    {speakers[1].department ? `${speakers[1].department}, ` : ""}
                    {speakers[1].institution}
                  </p>
                </div>
                <div className="speaker-name-div bottom text-start">
                  <h4 className="speaker-name">
                    {speakers[0].title} {speakers[0].name}
                  </h4>
                  <p className="speaker-department">
                    {speakers[0].department ? `${speakers[0].department}, ` : ""}
                    {speakers[0].institution}
                  </p>
                </div>
              </div>
              <div className="col-4 text-center">
                <img src={speakers[1].photo} alt={speakers[1].name} className="speaker-photo" />
                <h3 className="talk-title bottom">{speakers[1].talkTitle}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  
    return (
      <>
        {/* The header is responsive on its own, so — unlike the speaker
            layouts — it is rendered once rather than per breakpoint. */}
        {isNextEvent && <NextEventHeader event={event} />}
        <MobileLayout />
        <DesktopLayout />
      </>
    );
  };



const EventsList = () => {

  const [events, setEvents] = useState([]);
  const [showControls, setShowControls] = useState(window.innerWidth >= 992);
  const [swiper, setSwiper] = useState(null);
  const [position, setPosition] = useState({ isBeginning: true, isEnd: false });
  const pastEvents = events
    .filter((event) => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const upcomingEvents = events
    .filter((event) => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));


  useEffect(() => {
    fetch("/data/events.json")  // Fetch from public/
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.events);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => setShowControls(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <section className="band band-light events-band" id="events">
          <div className="band-inner">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <React.Fragment key={event.id}>
                  <Event event={event} isNextEvent />
                </React.Fragment>
              ))
            ) : (
              <NoNextEvent />
            )}
          </div>
        </section>

        <section className="band events-band">
          <div className="band-inner">
            <div className="section-head">
              <h2 className="event-badge event-badge-past">Past events</h2>

              <div className="carousel-nav">
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => swiper?.slidePrev()}
                  disabled={position.isBeginning}
                  aria-label="Previous event"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => swiper?.slideNext()}
                  disabled={position.isEnd}
                  aria-label="Next event"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={showControls ? 24 : 16}
              speed={showControls ? 400 : 300}
              grabCursor={!showControls}
              simulateTouch={!showControls}
              followFinger={!showControls}
              threshold={showControls ? 6 : 3}
              onSwiper={setSwiper}
              onSlideChange={(sw) => setPosition({ isBeginning: sw.isBeginning, isEnd: sw.isEnd })}
              className="past-events-swiper"
            >
              {pastEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <div className="past-event-slide">
                    <PastEventHeader event={event} />
                    <Event event={event} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
    </>
  );
};

export default EventsList;
