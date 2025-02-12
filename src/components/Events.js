import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase";
import "../assets/Events.css";
import { Carousel } from "react-bootstrap";


const NextEvent = ( {event} ) => {
    return (
        <div className="event-div">
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
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"
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
        <div className="event-div">
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

                {event.speaker.speaker2 ? (
                    <></>
                ):(
                    <div className="col-3">
                    </div>
                )}

                {/* First speaker section */}
                <div className="col-6" style={{paddingRight: "10px"}}>
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
                    <div className="col-6" style={{paddingRight: "10px"}}>
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

                {event.speaker.speaker2 ? (
                    <></>
                ):(
                    <div className="col-3">
                    </div>
                )}

            </div>

        </div>
    )
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

  console.log(events);

  return (
    <div className="container">

        {/* <h2 id="events" style={{ marginBottom: "30px", fontFamily:"Montserrat"}}>Upcoming Event</h2> */}
        <hr/>
        {events
        .filter(event => new Date(event.date) > new Date()) // Filter future events
        .map(event => (
            <NextEvent key={event.id} event={event} />
        ))}

        {/* <h2 style={{ marginBottom: "30px" }}>Past events</h2> */}
        <hr/>
        <Carousel>
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
  );
};

export default EventsList;
