import "../assets/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";


function Footer () {
    return(
        <div style={{ backgroundColor: "var(--bg-color-dark)"}}>
            <div className="footer-container">
                <div className="row text-center justify-content-center align-items-center">
                    <div className="col-4">
                        <div>Astronomy on Tap</div>
                        <div style={{fontSize: "0.75em", fontStyle: "italic"}}>Rhode Island</div>
                    </div>
                    <div className="col-4">
                        Follow us on social media!
                        <div>

                        <a href='https://www.facebook.com/profile.php?id=61564387694241' 
                            target='_blank'
                            rel="noreferrer"
                            className='social-icons'
                            style={{margin:5}}
                        >
                            <FontAwesomeIcon 
                            icon={faFacebook} 
                            className='fa-icon'
                            style={{height:"1em"}}
                            />
                        </a>

                        <a href='https://www.instagram.com/aotri24/'
                            target="_blank"
                            rel="noreferrer"
                            className='social-icons'
                            style={{margin:5}}
                        >
                            <FontAwesomeIcon 
                            icon={faInstagram} 
                            className='fa-icon'
                            style={{height:"1em"}}
                            />
                        </a>
                        </div>
                    </div>
                    <div className="col-4">
                        Contact us!
                        <div style={{fontSize: "0.75em"}}>
                            <a href="mailto:aotri24@gmail.com"
                                className="email-href"
                            >
                                aotri24@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3 copyright-message">
                    &copy; {new Date().getFullYear()} Astronomy on Tap Rhode Island. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer;