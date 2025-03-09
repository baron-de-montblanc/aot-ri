import React, {useState, useEffect} from "react";
import "../assets/Trivia.css";
import { Form } from "react-bootstrap";
import { Carousel } from "react-bootstrap";



function TriviaQuiz({ qna = [], title }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);

    // Ensure questions exist before accessing them
    const totalQuestions = qna.length;
    const currentQ = qna[currentQuestion] || {};

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!currentQ || !currentQ.answer) return;

        const isCorrectAnswer = selectedOption === currentQ.answer;
        setIsCorrect(isCorrectAnswer);
        if (isCorrectAnswer) setScore((prevScore) => prevScore + 1);
        setIsAnswered(true);
    };

    const handleContinue = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setIsCompleted(true);
        }
    };

    const handleStartOver = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(null);
        setIsCompleted(false);
        setScore(0);
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center trivia-container">
            <h2 className="trivia-event-name">{title}</h2>
            <div className="quiz-box">
                {isCompleted ? (
                    <Form>
                        <div className="quiz-over-div">
                            <h4 className="quiz-question-h4">Quiz completed!</h4>
                            <p>Final score: {score}/{totalQuestions}</p>
                        </div>
                        <button className="form-button" onClick={handleStartOver}>
                            Start Over
                        </button>
                    </Form>
                ) : (
                    currentQ.name ? (
                        <div>
                            <h4 className="quiz-question-h4">
                                Question {currentQuestion + 1}/{totalQuestions}: {currentQ.name}
                            </h4>

                            <Form onSubmit={handleSubmit}>
                                <div className="form-inner-div">
                                    {Array.isArray(currentQ.options) &&
                                        currentQ.options.map((option, i) => (
                                            <Form.Check
                                                key={`${currentQuestion}-${i}`}
                                                type="radio"
                                                id={`question-${currentQuestion}-option-${i}`}
                                                label={option}
                                                name={`question-${currentQuestion}`}
                                                value={option}
                                                onChange={handleOptionChange}
                                                checked={selectedOption === option}
                                                className="custom-radio-button"
                                            />
                                        ))}
                                </div>

                                {isAnswered ? (
                                    <div style={{ position: "relative" }}>
                                        <div className={`answer-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                                            {isCorrect ? "Correct!" : "Incorrect"}
                                        </div>
                                        <button
                                            className={`form-button ${isCorrect ? "correct" : "incorrect"}`}
                                            onClick={handleContinue}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                ) : (
                                    <button className="form-button submit-button" disabled={!selectedOption}>
                                        Submit
                                    </button>
                                )}
                            </Form>
                        </div>
                    ) : (
                        <p>Loading question...</p>
                    )
                )}
            </div>
        </div>
    );
}

function Trivia () {
    const [trivia, setTrivia] = useState([]);
    const [showControls, setShowControls] = useState(window.innerWidth >= 992);
    
    useEffect(() => {
        const handleResize = () => setShowControls(window.innerWidth >= 992);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      useEffect(() => {
          fetch("/data/trivia.json")  // Fetch from public/
            .then((response) => response.json())
            .then((json) => {
              setTrivia(json.trivia);
            })
            .catch((error) => console.error("Error fetching JSON:", error));
        }, []);

    return (
        <div className="trivia-content">
            <div className="container text-center">
                <hr/>
                <h2 id="trivia" className="trivia-title-h2">Trivia</h2>
                <p className="trivia-description">
                    Each week, attendees test their astronomy knowledge in a fun trivia game.  
                    It's a chance to learn something new—and maybe even win a prize! Test your space 
                    knowledge by trying out our previous trivia quizzes below!
                </p>

                <Carousel 
                    interval={null} 
                    controls={showControls} 
                    indicators={true} 
                    keyboard={false}
                    touch={true}
                >
                    {trivia
                    .filter(event => new Date(event.date) < new Date()) // Filter past events
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(event => {
                            const { date,title, ...eventQuestions } = event;
                            const questionsArray = Object.values(eventQuestions)[0]; // Convert object to array

                            return (
                                <Carousel.Item key={`trivia-${event.title}`}>
                                    <div style={{paddingBottom:"50px"}}>
                                        <TriviaQuiz qna={questionsArray} title={event.title} />
                                    </div>
                                </Carousel.Item>
                            );
                    })}
                </Carousel>
            </div>
        </div>
    );
}

export default Trivia;