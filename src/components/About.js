import React from "react";
import '../assets/About.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Organizer() {
    const organizers = [
        { id: 1, 
            name: "Jade Ducharme", 
            linkedin: "https://www.linkedin.com/in/jade-ducharme-00013a220/",
            image: "/images/organizers/jade.jpg",
            intro: "PhD Candidate, Brown Physics Department",
            message: 'A 4th year physics PhD student from Canada, working with Prof. Jonathan Pober on 21-cm cosmology. 21-cm cosmology aims to map out the mysterious Dark Ages of the Universe by detecting the ultrafaint signal emitted by neutral hydrogen at that epoch. Large radio interferometers were built in remote areas all over the world for this purpose, but the 21-cm signal remains elusive. Jade hopes that her work on mitigating radio frequency interference will help bring us one step closer to detecting it.'
        },
        { id: 2, 
            name: "Kanchita (Khing) Klangboonkrong", 
            linkedin: "https://www.linkedin.com/in/kanchita-klangboonkrong-87991817a/",
            image: "/images/organizers/khing.jpg",
            intro: "PhD Candidate, Brown Physics Department",
            message: "A fourth year physics PhD student from Thailand, working with Prof. Greg Tucker on EXCITE (Exoplanet Climate Infrared TElescope). EXCITE is a balloon telescope for phase-resolved spectroscopy of hot Jupiters (0.8–4 µm), studying their atmospheres’ composition, structure, and brightness. She is a co-leader of the Women in Physics organization (WiP) at Brown University. In her free time, she loves hiking, gardening, and traveling."
        },
        { id: 3, 
            name: "Janette (Janie) Levin", 
            linkedin: "",
            image: "/images/anon.jpg",
            intro: "PhD Candidate, Brown Department of Earth, Environmental & Planetary Sciences",
            message: ""
        },
        { id: 4, 
            name: "Alexis Ortega", 
            linkedin: "",
            image: "/images/anon.jpg",
            intro: "PhD Candidate, Brown Physics Department",
            message: ""
        },
        { id: 5, 
            name: "Panupong (Pitt) Phoompuang", 
            linkedin: "",
            image: "/images/anon.jpg",
            intro: "Masters Student, Brown Physics Department",
            message: ""
        },
    ];

    return (
        <div className="container text-center">
            <h2 className="mt-4 mb-4">Meet the Organizers</h2>

            <div className="row justify-content-center">
                {organizers.map((organizer) => (
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" key={organizer.id}>
                        <img 
                            src={organizer.image}
                            alt={organizer.name}
                            className="organizer-photo img-fluid rounded-circle"
                        />
                        <h5 className="organizer-name mt-2">
                            <a
                                href={organizer.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="organizer-link"
                            >
                                {organizer.name}
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="ms-2"
                                    aria-label="LinkedIn profile"
                                />
                            </a>
                        </h5>
                        <h6 className="organizer-intro">
                            {organizer.intro}
                        </h6>
                        <p className="organizer-message">
                            {organizer.message}
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