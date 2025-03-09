import React from "react";
import '../assets/About.css';


function Organizer() {
    const organizers = [
        { id: 1, name: "Organizer 1", image: "/images/anon.jpg" },
        { id: 2, name: "Organizer 2", image: "/images/anon.jpg" },
        { id: 3, name: "Organizer 3", image: "/images/anon.jpg" },
        { id: 4, name: "Organizer 4", image: "/images/anon.jpg" },
        { id: 5, name: "Organizer 5", image: "/images/anon.jpg" },
        { id: 6, name: "Organizer 6", image: "/images/anon.jpg" }
    ];

    return (
        <div className="container text-center">
            <h2 className="mt-4 mb-4">Meet the Organizers</h2>

            <div className="row justify-content-center">
                {organizers.map((organizer) => (
                    <div className="col-6 col-sm-6 col-md-3 col-lg-2 mb-4" key={organizer.id}>
                        <img 
                            src={organizer.image}
                            alt={organizer.name}
                            className="organizer-photo img-fluid rounded-circle"
                        />
                        <h5 className="organizer-name mt-2">{organizer.name}</h5>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}



function About () {
    return (
        <div className="about-content">
            <div className="container">
                <h2 className="about-h2" id="about">About</h2>
                <p className="about-p">
                    Astronomy on Tap Rhode Island is organized by a small team of 
                    graduate students at Brown University.  
                </p>
                <Organizer/>
            </div>
        </div>
    )
}

export default About;