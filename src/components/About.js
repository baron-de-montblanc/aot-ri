import React from "react";
import '../assets/About.css';


function Organizer () {

    const organizers = [
        { id: 1, name: "Organizer 1", image: "/images/anon.jpg" },
        { id: 2, name: "Organizer 2", image: "/images/anon.jpg" },
        { id: 3, name: "Organizer 3", image: "/images/anon.jpg" },
        { id: 4, name: "Organizer 4", image: "/images/anon.jpg" },
        { id: 5, name: "Organizer 5", image: "/images/anon.jpg" },
        { id: 6, name: "Organizer 6", image: "/images/anon.jpg" }
    ];

    return (

        <div className="d-flex justify-content-center text-center align-items-center">
            <div className="row organizer-div justify-content-center text-center align-items-center">

                {organizers.map((organizer) => (
                    <div className="col-2" key={organizer.id}>
                        <img 
                            src={organizer.image}
                            alt="organizer photo"
                            className="organizer-photo"
                        >
                        </img>
                        <p className="organizer-name">{organizer.name}</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                ))}


            </div>
        </div>


    )
};


function About () {
    return (
        <div className="container">
            <hr/>
            <h2 className="about-h2" id="about">About</h2>
            <p className="text-center mb-4">
                Astronomy on Tap Rhode Island is organized by a small team of 
                graduate students at Brown University.  
            </p>
            <Organizer/>
        </div>
    )
}

export default About;