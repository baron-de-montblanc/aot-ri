import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase";
import "../assets/Events.css";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";



function NoNextEvent() {
    return (
        <>

            <div className="d-flex d-lg-none no-next-event">
                <div className="container">

                    <div className="row text-center">

                        <div className="col-12">
                            <h2>Upcoming Event</h2>
                        </div>

                        <div>
                            <img 
                                src="/images/rocket.png"
                                className="rocket-image"
                            />
                        </div>

                        <div className="col-12">
                            <p>
                                No upcoming events yet—but stay tuned! Follow us on social media to be 
                                the first to know when the next Astronomy on Tap Rhode Island 
                                event is announced. 
                            </p>

                            <div className='social-container'>
                                <a href='https://www.facebook.com/profile.php?id=61564387694241' 
                                    target='_blank'
                                    rel="noreferrer"
                                    className='social-icons'
                                >
                                    <FontAwesomeIcon 
                                    icon={faFacebook} 
                                    className='fa-icon'
                                    />
                                </a>
                                <a href='https://www.instagram.com/aotri24/'
                                    target="_blank"
                                    rel="noreferrer"
                                    className='social-icons'
                                >
                                    <FontAwesomeIcon 
                                    icon={faInstagram} 
                                    className='fa-icon'
                                    />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


            <div className="d-none d-lg-flex no-next-event">
                <div className="container">

                    <div className="row text-center">

                        <div className="col-6">
                            <img 
                                src="/images/rocket.png"
                                className="rocket-image"
                            />
                        </div>

                        <div className="col-6">

                            <h2>Upcoming Event</h2>

                            <p>
                            No upcoming events yet—but stay tuned! Follow us on social media to be 
                            the first to know when the next Astronomy on Tap Rhode Island 
                            event is announced. 
                            </p>

                            <div className='social-container'>
                                <a href='https://www.facebook.com/profile.php?id=61564387694241' 
                                    target='_blank'
                                    rel="noreferrer"
                                    className='social-icons'
                                >
                                    <FontAwesomeIcon 
                                    icon={faFacebook} 
                                    className='fa-icon'
                                    />
                                </a>
                                <a href='https://www.instagram.com/aotri24/'
                                    target="_blank"
                                    rel="noreferrer"
                                    className='social-icons'
                                >
                                    <FontAwesomeIcon 
                                    icon={faInstagram} 
                                    className='fa-icon'
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

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
                        {event.date.toLocaleString("en-US", {
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



const PrevEvent = ( {event} ) => {
    return (
        <>

            <div className="d-flex d-lg-none past-event-container">
                <div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="event-title">{event.title}</h2>
                            <h3 className="event-date">
                                {event.date.toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h3>
                        </div>
                    </div>

                    {event.speaker.speaker2 ? (
                        <div className="row text-center align-items-center">

                            <div className="col-6 d-flex flex-column align-items-center text-center">
                                <img 
                                    src={event.photoPath.photo1}
                                    alt={event.speaker.speaker1}
                                    className="speaker-photo photo-small"
                                />
                            </div>

                            <div className="col-6 d-flex flex-column align-items-center text-center">
                                <div className="speaker-name-div left">
                                    <h2 className="speaker-name speaker-name-small">{event.speakerTitle.title1} {event.speaker.speaker1}</h2>
                                    <p className="speaker-department speaker-department-small">{event.institution.ins1}</p>
                                </div>
                            </div>

                            <div className="col-12 text-center">
                                <h3 className="talk-title talk-title-small top">{event.talkTitle.title1}</h3>
                            </div>

                            <div className="col-6 d-flex flex-column align-items-center text-center">
                                <div className="speaker-name-div right">
                                    <h2 className="speaker-name speaker-name-small">{event.speakerTitle.title2} {event.speaker.speaker2}</h2>
                                    <p className="speaker-department speaker-department-small">{event.institution.ins2}</p>
                                </div>
                            </div>

                            <div className="col-6 d-flex flex-column align-items-center text-center">
                                <img 
                                    src={event.photoPath.photo2}
                                    alt={event.speaker.speaker2}
                                    className="speaker-photo photo-small"
                                />
                            </div>

                            <div className="col-12 text-center">
                                <h3 className="talk-title talk-title-small">{event.talkTitle.title2}</h3>
                            </div>
                        </div>
                    ):(
                        <div className="row">
                        <div className="col-12">
                            <img 
                                src={event.photoPath.photo1}
                                alt={event.speaker.speaker1}
                                className="speaker-photo"
                            />
                        </div>

                        <div className="col-12 text-center">
                            <div className="speaker-name-div">
                                <h2 className="speaker-name">{event.speakerTitle.title1} {event.speaker.speaker1}</h2>
                                <p className="speaker-department">{event.institution.ins1}</p>
                            </div>
                        </div>

                        <div className="col-12 text-center">
                            <h3 className="talk-title">{event.talkTitle.title1}</h3>
                        </div>
                    </div>
                    )}

                </div>
            </div>


            <div className="d-none d-lg-flex past-event-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="event-title">{event.title}</h2>
                            <h3 className="event-date">
                                {event.date.toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h3>
                        </div>
                    </div>

                    {!event.speaker.speaker2 ? (
                        <div className="row align-items-center single-speaker-div">


                            <div className="col-5">
                                <img 
                                    src={event.photoPath.photo1}
                                    alt={event.speaker.speaker1}
                                    className="speaker-photo"
                                />
                            </div>

                            <div className="col-7 text-center">
                                <div className="speaker-name-div">
                                    <h2 className="speaker-name">{event.speakerTitle.title1} {event.speaker.speaker1}</h2>
                                    <p className="speaker-department">{event.department.dep1}, {event.institution.ins1}</p>
                                </div>
                                <h3 className="talk-title">{event.talkTitle.title1}</h3>
                            </div>

                        </div>

                    ):(

                        <div className="row align-items-center">
                            <div className="col-4 text-center">
                                <h3 className="talk-title top">{event.talkTitle.title1}</h3>
                                <img
                                    src={event.photoPath.photo1}
                                    alt={event.speaker.speaker1}
                                    className="speaker-photo"
                                />
                            </div>

                            <div className="col-4">
                                <div className="speaker-name-div top">
                                    <h2 className="speaker-name text-end">{event.speakerTitle.title2} {event.speaker.speaker2}</h2>
                                    <p className="speaker-department text-end">{event.department.dep2}, {event.institution.ins2}</p>
                                </div>

                                <div className="speaker-name-div bottom">
                                    <h2 className="speaker-name text-start">{event.speakerTitle.title1} {event.speaker.speaker1}</h2>
                                    <p className="speaker-department text-start">{event.department.dep1}, {event.institution.ins1}</p>
                                </div>
                            </div>

                            <div className="col-4 text-center">
                                <img
                                    src={event.photoPath.photo2}
                                    alt={event.speaker.speaker2}
                                    className="speaker-photo"
                                />
                                <h3 className="talk-title bottom">{event.talkTitle.title2}</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


const EventsList = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
        const eventsCollectionRef = collection(db, "aot-ri");
        const querySnapshot = await getDocs(eventsCollectionRef);
    
        const eventsList = querySnapshot.docs.map(doc => {
            const data = doc.data();
    
            return {
                ...data,
                date: data.date.toDate()
            };
        });
    
        setEvents(eventsList);
    };
    fetchEvents();
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

            <div className="container">
                <h2 className="past-events-floating text-start">Past Events</h2>
            </div>

            <Carousel interval={null}>
                {events
                .filter(event => new Date(event.date) < new Date()) // Filter past events
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(event => (
                    <Carousel.Item key={event.id}>
                    <div style={{padding:"10px 120px"}}>
                        <PrevEvent event={event} />
                    </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    </>
  );
};

export default EventsList;
