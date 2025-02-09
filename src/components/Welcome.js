import '../assets/Welcome.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';



function Welcome () {
    return (
        <div id="welcome" className="container welcome-div">
          <header className="row welcome-header">
            <img src={"/images/galaxy.png"} 
              className="galaxy col-12 col-md-6" 
              alt="logo"
            />
            <div className='col-12 col-md-6'>
                <h1 className='astro-title'> Astronomy on Tap </h1>
                <h2 className='rhode-island-title'> Rhode Island </h2>
            </div>
          </header>
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
            <div className='arrow-div'>
              <a href='#top' className='arrow-href'>
                <FontAwesomeIcon 
                  icon={faCircleDown} 
                  className='arrow-icon'
                />
              </a>
            </div>
        </div>
      );
}

export default Welcome;