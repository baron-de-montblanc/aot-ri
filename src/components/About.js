import React from "react";
import '../assets/About.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Organizer() {
    const organizers = [
        { id: 1, 
            name: "Jade Ducharme", 
            linkedin: "https://www.linkedin.com/in/jade-ducharme-00013a220/",
            image: "/images/organizers/jade.png",
            title: "PhD Candidate",
            department: "Brown Physics Department",
            message: 'Jade is a fifth-year physics PhD candidate from Canada, working with Prof. Jonathan Pober on 21-cm cosmology. 21-cm cosmology aims to map out the mysterious Dark Ages of the Universe by detecting the ultrafaint signal emitted by neutral hydrogen at that epoch. Large radio interferometers were built in remote areas all over the world for this purpose, but the 21-cm signal remains elusive. Jade hopes that her work on mitigating radio frequency interference will help bring us one step closer to detecting it.'
        },
        { id: 2,
            name: "Kanchita (Khing) Klangboonkrong",
            linkedin: "https://www.linkedin.com/in/kanchita-klangboonkrong-87991817a/",
            image: "/images/organizers/khing.jpg",
            title: "PhD Candidate",
            department: "Brown Physics Department",
            message: "Khing is a fifth-year physics PhD candidate from Thailand, working with Prof. Greg Tucker on EXCITE (Exoplanet Climate Infrared TElescope). EXCITE is a balloon telescope for phase-resolved spectroscopy of hot Jupiters (0.8–4 µm), studying their atmospheres’ composition, structure, and brightness. She is a co-leader of the Women in Physics organization (WiP) at Brown University. In her free time, she loves hiking, gardening, and traveling."
        },
        { id: 3,
            name: "Chompoonek (Chicha) Nimitpornsuko",
            linkedin: "https://www.linkedin.com/in/chompoonek-nimitpornsuko-4536782a6/",
            image: "/images/organizers/chicha.png",
            title: "Senior Undergaduate",
            department: "Brown Department of Engineering",
            message: "Chicha is a fourth-year undergraduate student from Thailand studying Electrical Engineering and International and Public Affairs. She is an Engineering Co-Lead for T-REX (Time-Resolving Black Hole Explorer), a mission concept exploring how we can observe black holes as they evolve. Alongside her engineering work, she is currently working on a thesis on commercial actors reshaping space governance and diplomacy. She also enjoys bringing people together through organizing aerospace conferences and conversations about humanity’s future in space. In her free time, she loves reading, writing, and windsurfing."
        },
        { id: 4,
            name: "Lauren Roussel",
            linkedin: "",
            image: "/images/anon.jpg",
            title: "",
            department: "Brown Physics Department",
            message: ""
        },
    ];

    const alumniOrganizers = [
        { id: 1, name: "Dr. Janette (Janie) Levin", affiliation: "Brown Department of Earth, Environmental & Planetary Sciences", linkedin: "" },
        { id: 2, name: "Dr. Alexis Ortega", affiliation: "Brown Physics Department", linkedin: "https://www.linkedin.com/in/alexis-ortega-89786013a/" },
        { id: 3, name: "Panupong (Pitt) Phoompuang", affiliation: "Brown Physics Department", linkedin: "https://www.linkedin.com/in/panupong-phoompuang/" },
    ];

    return (
        <>
            <h3 className="organizers-title">Meet the organizers</h3>

            <div className="organizer-grid">
                {organizers.map((organizer) => (
                    <div className="organizer" key={organizer.id}>
                        <img 
                            src={organizer.image}
                            alt={organizer.name}
                            className="organizer-photo"
                        />
                        <h4 className="organizer-name">
                            {organizer.linkedin ? (
                                <a
                                    href={organizer.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="organizer-link"
                                >
                                    {organizer.name}
                                    <FontAwesomeIcon
                                        icon={faLinkedin}
                                        className="organizer-linkedin"
                                        aria-label="LinkedIn profile"
                                    />
                                </a>
                            ) : (
                                organizer.name
                            )}
                        </h4>
                        <p className="organizer-intro">
                            {organizer.title && <>{organizer.title}<br /></>}
                            {organizer.department}
                        </p>
                        <p className="organizer-message">
                            {organizer.message}
                        </p>
                    </div>
                ))}
            </div>

            <h3 className="alumni-organizers-title">Alumni organizers</h3>

            <div className="alumni-grid">
                {alumniOrganizers.map((organizer) => (
                    <div className="alumnus" key={organizer.id}>
                        <h4 className="organizer-name">
                            {organizer.linkedin ? (
                                <a
                                    href={organizer.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="organizer-link"
                                >
                                    {organizer.name}
                                    <FontAwesomeIcon
                                        icon={faLinkedin}
                                        className="organizer-linkedin"
                                        aria-label="LinkedIn profile"
                                    />
                                </a>
                            ) : (
                                organizer.name
                            )}
                        </h4>
                        <p className="organizer-intro">{organizer.affiliation}</p>
                    </div>
                ))}
            </div>
        </>
    );
}



function About () {
    return (
        <section className="band band-light about-band" id="about">
            <div className="band-inner">
                <h2 className="section-title">About</h2>
                <p className="section-lead">
                    Astronomy on Tap Rhode Island is run by a small team of students at
                    Brown University, on their own time, for anyone who wants to come.
                </p>
                <Organizer/>
            </div>
        </section>
    )
}

export default About;