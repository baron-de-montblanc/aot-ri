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


const Event = ({ event }) => {
    const formattedDate = format(new Date(event.date), "MMMM d, yyyy");
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
  
    const MobileSpeaker = ({ spk, position }) => {
      const isLeft = position === "left";
      return (
        <div className="row text-center align-items-center">
          <div className={`col-${isLeft ? "5" : "7"} d-flex flex-column align-items-center`}>
            {isLeft ? (
              <img src={spk.photo} alt={spk.name} className="speaker-photo" />
            ) : (
              <div className="speaker-name-div right">
                <h2 className="speaker-name">
                  {spk.title} {spk.name}
                </h2>
                <p className="speaker-department">{spk.institution}</p>
              </div>
            )}
          </div>
          <div className={`col-${isLeft ? "7" : "5"} d-flex flex-column align-items-center`}>
            {isLeft ? (
              <div className="speaker-name-div left">
                <h2 className="speaker-name">
                  {spk.title} {spk.name}
                </h2>
                <p className="speaker-department">{spk.institution}</p>
              </div>
            ) : (
              <img src={spk.photo} alt={spk.name} className="speaker-photo" />
            )}
          </div>
          <div className="col-12 text-center">
            <h3 className="talk-title">{spk.talkTitle}</h3>
          </div>
        </div>
      );
    };
  
    const MobileLayout = () => (
      <div className={`d-flex flex-column d-md-none align-items-center justify-content-center event-container`}>
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="event-title">{event.title}</h2>
            <h3 className="event-date">{formattedDate}</h3>
          </div>
        </div>
        {speakers[0] && <MobileSpeaker spk={speakers[0]} position="left" />}
        {speakers[1] && <MobileSpeaker spk={speakers[1]} position="right" />}
      </div>
    );
  
    const DesktopLayout = () => (
      <div className={`d-none d-md-flex align-items-center justify-content-center event-container`}>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="event-title">{event.title}</h2>
              <h3 className="event-date">{formattedDate}</h3>
            </div>
          </div>
  
          {speakers.length === 1 ? (
            // Single speaker
            <div className="row align-items-center single-speaker-div">
              <div className="col-5">
                <img src={speakers[0].photo} alt={speakers[0].name} className="speaker-photo" />
              </div>
              <div className="col-7 text-center">
                <h2 className="speaker-name">
                  {speakers[0].title} {speakers[0].name}
                </h2>
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
                  <h2 className="speaker-name">
                    {speakers[1].title} {speakers[1].name}
                  </h2>
                  <p className="speaker-department">
                    {speakers[1].department ? `${speakers[1].department}, ` : ""}
                    {speakers[1].institution}
                  </p>
                </div>
                <div className="speaker-name-div bottom text-start">
                  <h2 className="speaker-name">
                    {speakers[0].title} {speakers[0].name}
                  </h2>
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
                .map(event => 
                <div className="event-next">
                  <div className="container">
                    <div className="floating-map-div">
                      <iframe src={event.iframesrc} title="Events Map" className="floating-next-event-map"></iframe>
                    </div>
                    <h2 className="next-event-floating">Upcoming Event!</h2>
                    <Event key={event.id} event={event} />
                  </div>
                </div>
                )
        ) : (
            <NoNextEvent />
        )}

        <div>
            <div className="container event-top">
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
                      <div style={{padding:"100px 40px"}}>
                          <Event event={event} />
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
