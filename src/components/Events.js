import React, { useEffect, useState } from "react";
import { db, doc, getDoc } from "../firebase";
import "../assets/Events.css";


const Event = ( {event} ) => {
    return (
        <div className="event-div">
            <div className="row">

                <div className="col-3">
                    <iframe src={event.iframesrc}
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"> 
                    </iframe>
                    <h1>{event.location}</h1>
                    <p>{event.address.line1}</p>
                    <p>{event.address.line2}</p>
                </div>

                <div className="col-9">
                    <h1>{event.title}</h1>
                    <h3>{event.date}</h3>

                    <div className="row">

                        <div className="col-6">
                            <h1>{event.speaker.speaker1}</h1>
                            <h3>{event.talkTitle.title1}</h3>
                            <h3>{event.department.dep1}</h3>
                            <h3>{event.institution.ins1}</h3>
                        </div>

                        <div className="col-6">
                            <h1>{event.speaker.speaker2}</h1>
                            <h3>{event.talkTitle.title2}</h3>
                            <h3>{event.department.dep2}</h3>
                            <h3>{event.institution.ins2}</h3>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
};

const EventsList = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      
        const docRef = doc(db, "aot-ri", "events");
        const docSnap = await getDoc(docRef);

        console.log(docSnap)

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Reformat date
            const formattedData = {
                ...data,
                date: data.date.toDate().toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // Set to false for 24-hour format
                }),
              };

            setEvents([formattedData]);
        }

    };
    fetchEvents();
  }, []);

  console.log(events);

  return (
    <div className="container">
      <h2>Past Events</h2>
        {events.map(event => (
            <Event event={event} />
        ))}
    </div>
  );
};

export default EventsList;
