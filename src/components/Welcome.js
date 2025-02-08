import '../assets/Welcome.css';


function Welcome () {
    return (
        <div id="welcome" className="container welcome-div">
          <header className="welcome-header">
            <img src={"/images/galaxy.png"} className="galaxy" alt="logo" />
            <div>
                <h1 className='astro-title'> Astronomy on Tap </h1>
                <h2 className='rhode-island-title'> Rhode Island </h2>
            </div>
          </header>
        </div>
      );
}

export default Welcome;