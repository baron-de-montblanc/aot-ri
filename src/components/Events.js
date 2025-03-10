import React, { useEffect, useState } from "react";
import "../assets/Events.css";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { format } from "date-fns";




function NoNextEvent() {
    return (
      <div className="d-flex no-next-event">
        <div className="container">
          <div className="row text-center">
            {/* Mobile layout */}
            <div className="col-12 d-flex d-lg-none flex-column align-items-center">
              <h2>Upcoming Event</h2>
              <img alt="rocket" src="/images/rocket.png" className="rocket-image" />
              <p>
                No upcoming events yet—but stay tuned! Follow us on social media to be the first to
                know when the next Astronomy on Tap Rhode Island event is announced.
              </p>
            </div>
  
            {/* Desktop layout */}
            <div className="d-none d-lg-flex col-12 align-items-center">
              <div className="col-6 text-center">
                <img alt="rocket" src="/images/rocket.png" className="rocket-image" />
              </div>
              <div className="col-6">
                <h2>Upcoming Event</h2>
                <p>
                  No upcoming events yet—but stay tuned! Follow us on social media to be the first to
                  know when the next Astronomy on Tap Rhode Island event is announced.
                </p>
              </div>
            </div>
  
            {/* Social media links (shared across both layouts) */}
            <div className="d-none d-lg-flex col-lg-6"></div>
            <div className="col-12 col-lg-6 text-center">
              <div className="social-container">
                <a
                  href="https://www.facebook.com/profile.php?id=61564387694241"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icons"
                >
                  <FontAwesomeIcon icon={faFacebook} className="fa-icon" />
                </a>
                <a
                  href="https://www.instagram.com/aotri24/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icons"
                >
                  <FontAwesomeIcon icon={faInstagram} className="fa-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



const NextEvent = ( {event} ) => {
    return (
        <div className="event-div" style={{position:'relative'}}>

            <div>
                <h2 className="upcoming-event-h2">UPCOMING EVENT!</h2>
            </div>

            <div className="row">
                <div className="col-12">
                    <h1 className="event-title">{event.title}</h1>
                    <h3 className="event-date">
                        {new Date(event.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // Set to false for 24-hour format
                        })}
                    </h3>
                </div>
            </div>

            <div className="row">

                {/* Map section */}
                <div className={`col-${event.speaker.speaker2 ? "2" : "6"}`}>
                    <iframe 
                        src={event.iframesrc}
                        title={event.location}
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="location-map"
                    >
                    </iframe>
                    <div>
                        <h2 className="location-name">{event.location}</h2>
                        <p className="location-address">{event.address.line1}</p>
                        <p className="location-address">{event.address.line2}</p>
                    </div>
                </div>

                {/* First speaker section */}
                <div className={`col-${event.speaker.speaker2 ? "5" : "6"}` } style={{paddingRight: "10px"}}>
                    <div className="speaker-div">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="speaker-name">{event.speakerTitle.title1} {event.speaker.speaker1}</h1>
                                <p className="speaker-department">{event.department.dep1}, {event.institution.ins1}</p>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            <div className="col-6">
                                <img
                                    src={event.photoPath.photo1}
                                    alt={event.speaker.speaker1}
                                    className="speaker-photo"
                                />
                            </div>
                            <div className="col-6">
                                <h2 className="talk-title talk-title-left">{event.talkTitle.title1}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second speaker section (if exists) */}
                {event.speaker.speaker2 && (
                    <div className="col-5" style={{paddingRight: "10px"}}>
                        <div className="speaker-div">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="speaker-name">{event.speakerTitle.title2} {event.speaker.speaker2}</h1>
                                    <p className="speaker-department">{event.department.dep2}, {event.institution.ins2}</p>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center">
                                <div className="col-6">
                                    <h2 className="talk-title talk-title-right">{event.talkTitle.title2}</h2>
                                </div>
                                <div className="col-6">
                                    <img
                                        src={event.photoPath.photo2}
                                        alt={event.speaker.speaker2}
                                        className="speaker-photo"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};



const PrevEvent = ({ event }) => {
  const formattedDate = format(new Date(event.date), "MMMM d, yyyy");
  const { speaker, speakerTitle, institution, department, talkTitle, photoPath } = event;

  const MobileSpeaker = ({ speakerIndex, position }) => {
    const isLeft = position === "left";
  
    return (
      <div className="row text-center align-items-center">
        <div className={`col-${isLeft ? "5" : "7"} d-flex flex-column align-items-center`}>
          {isLeft && (
            <img
              src={photoPath[`photo${speakerIndex}`]}
              alt={speaker[`speaker${speakerIndex}`]}
              className="speaker-photo"
            />
          )}
          {!isLeft && (
            <div className="speaker-name-div right">
              <h2 className="speaker-name">
                {speakerTitle[`title${speakerIndex}`]} {speaker[`speaker${speakerIndex}`]}
              </h2>
              <p className="speaker-department">{institution[`ins${speakerIndex}`]}</p>
            </div>
          )}
        </div>
        <div className={`col-${isLeft ? "7" : "5"} d-flex flex-column align-items-center`}>
          {isLeft ? (
            <div className="speaker-name-div left">
              <h2 className="speaker-name">
                {speakerTitle[`title${speakerIndex}`]} {speaker[`speaker${speakerIndex}`]}
              </h2>
              <p className="speaker-department">{institution[`ins${speakerIndex}`]}</p>
            </div>
          ) : (
            <img
              src={photoPath[`photo${speakerIndex}`]}
              alt={speaker[`speaker${speakerIndex}`]}
              className="speaker-photo"
            />
          )}
        </div>
        <div className="col-12 text-center">
          <h3 className="talk-title">{talkTitle[`title${speakerIndex}`]}</h3>
        </div>
      </div>
    );
  };
  

  const MobileLayout = () => (
    <div className="d-flex flex-column d-md-none align-items-center justify-content-center past-event-container">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="event-title">{event.title}</h2>
          <h3 className="event-date">{formattedDate}</h3>
        </div>
      </div>
      <MobileSpeaker speakerIndex={1} position="left" />
      {speaker.speaker2 && <MobileSpeaker speakerIndex={2} position="right"/>}
    </div>
  );
  

  const DesktopLayout = () => (
    <div className="d-none d-md-flex align-items-center justify-content-center past-event-container">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <h2 className="event-title">{event.title}</h2>
            <h3 className="event-date">{formattedDate}</h3>
          </div>
        </div>
        {!speaker.speaker2 ? (
          <div className="row align-items-center single-speaker-div">
            <div className="col-5">
              <img src={photoPath.photo1} alt={speaker.speaker1} className="speaker-photo" />
            </div>
            <div className="col-7 text-center">
              <h2 className="speaker-name">{speakerTitle.title1} {speaker.speaker1}</h2>
              <p className="speaker-department">{department.dep1}, {institution.ins1}</p>
              <h3 className="talk-title">{talkTitle.title1}</h3>
            </div>
          </div>
        ) : (
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <h3 className="talk-title top">{talkTitle.title1}</h3>
              <img src={photoPath.photo1} alt={speaker.speaker1} className="speaker-photo" />
            </div>
            <div className="col-4">
              <div className="speaker-name-div top text-end">
                <h2 className="speaker-name">{speakerTitle.title2} {speaker.speaker2}</h2>
                <p className="speaker-department">{department.dep2}, {institution.ins2}</p>
              </div>
              <div className="speaker-name-div bottom text-start">
                <h2 className="speaker-name">{speakerTitle.title1} {speaker.speaker1}</h2>
                <p className="speaker-department">{department.dep1}, {institution.ins1}</p>
              </div>
            </div>
            <div className="col-4 text-center">
              <img src={photoPath.photo2} alt={speaker.speaker2} className="speaker-photo" />
              <h3 className="talk-title bottom">{talkTitle.title2}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <MobileLayout />
      <DesktopLayout />
    </>
  );
};


const EventsList = () => {

  const [events, setEvents] = useState([]);
  const [showControls, setShowControls] = useState(window.innerWidth >= 992);


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

        <div id="events"></div>
        {events.filter(event => new Date(event.date) > new Date()).length > 0 ? (
            events
                .filter(event => new Date(event.date) > new Date()) // Filter future events
                .map(event => <NextEvent key={event.id} event={event} />)
        ) : (
            <NoNextEvent />
        )}

        <div>

            <div className="container past-event-top">
              <h2 className="past-events-floating text-start">Past Events</h2>
              
              <Carousel 
                interval={null}
                controls={showControls}
                touch={true}
              >
                  {events
                  .filter(event => new Date(event.date) < new Date()) // Filter past events
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(event => (
                      <Carousel.Item key={event.id}>
                      <div style={{padding:"100px 60px"}}>
                          <PrevEvent event={event} />
                      </div>
                      </Carousel.Item>
                  ))}
              </Carousel>
            </div>
        </div>
    </>
  );
};

export default EventsList;
