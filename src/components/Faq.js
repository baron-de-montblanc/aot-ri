import React from "react";
import "../assets/Faq.css";



function Faq () {
    return (
        <section className="band faq-band" id="faq">
            <div className="band-inner">
                <h2 className="section-title">Questions, answered</h2>

                <div className="faq-list">
                <div className="faq-item">
                    <h3 className="faq-question">Do I need an astronomy background to enjoy these events?</h3>
                    <p className="faq-answer">Not at all! Astronomy on Tap is designed for everyone — whether you're a total beginner or a seasoned stargazer. 
                Our talks are fun, engaging, and accessible to anyone with a curiosity about the universe.</p>
                </div>

                <div className="faq-item">
                    <h3 className="faq-question">Is this a 21+ event?</h3>
                    <p className="faq-answer">While the event is held in a bar or pub, all ages are welcome unless the venue requires otherwise. 
                Please check the venue's age policy beforehand!</p>
                </div>

                <div className="faq-item">
                    <h3 className="faq-question">Is there a cost to attend?</h3>
                    <p className="faq-answer">No! Astronomy on Tap events are completely FREE to attend. Just bring your curiosity (and maybe buy a drink to support the venue).</p>
                </div>

                <div className="faq-item">
                    <h3 className="faq-question">Do I need to register ahead of time?</h3>
                    <p className="faq-answer">Nope! Just show up and grab a seat!</p>
                </div>

                <div className="faq-item">
                    <h3 className="faq-question">Can I bring my kids?</h3>
                    <p className="faq-answer">Absolutely — if the venue allows minors. Our talks are meant to be fun and family-friendly!</p>
                </div>

                <div className="faq-item">
                    <h3 className="faq-question">Can I ask questions during the talk?</h3>
                    <p className="faq-answer">Yes, please! We love curious minds. We always reserve time for Q&A at the end of each talk, and speakers are often available afterward too.</p>
                </div>

                <div className="faq-item">
                    <h3 className="faq-question">How can I stay updated about future events?</h3>
                    <p className="faq-answer">
                        Follow us on social media! We regularly update with upcoming events and
                        recaps of past events! You can also{" "}
                        <a
                            href="https://buttondown.com/AoT-RI"
                            target="_blank"
                            rel="noreferrer"
                            className="text-link"
                        >
                            subscribe to our newsletter
                        </a>{" "}
                        to be the first to know when the next event is happening, and to receive
                        recaps of past events (with pictures!).
                    </p>
                </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;