import React from "react";
import '../assets/About.css';


function Organizer() {
    const organizers = [
        { id: 1, 
            name: "Jade Ducharme", 
            image: "/images/anon.jpg",
            intro: "PhD Candidate, Brown Physics Department"
        },
        { id: 2, 
            name: "Kanchita (Khing) Klangboonkrong", 
            image: "/images/anon.jpg",
            intro: "PhD Candidate, Brown Physics Department"
        },
        { id: 3, 
            name: "Janette (Janie) Levin", 
            image: "/images/anon.jpg",
            intro: "PhD Candidate, Brown Department of Earth, Environmental & Planetary Sciences"
        },
        { id: 4, 
            name: "Alexis Ortega", 
            image: "/images/anon.jpg",
            intro: "PhD Candidate, Brown Physics Department"
        },
        { id: 5, 
            name: "Panupong (Pitt) Phoompuang", 
            image: "/images/anon.jpg",
            intro: "Masters Student, Brown Physics Department"
        },
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
                        <h6 className="organizer-intro">
                            {organizer.intro}
                        </h6>
                        <p>
                            Add your personal message?
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