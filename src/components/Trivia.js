import React, {useState, useEffect} from "react";
import { db, collection, getDocs } from "../firebase";
import "../assets/Trivia.css";
import { Form } from "react-bootstrap";
import { Carousel } from "react-bootstrap";


function TriviaQuiz ({qna = [], title}) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setUserAnswer("");
    };

    const handleShortAnswerChange = (event) => {
        setUserAnswer(event.target.value);
        setSelectedOption(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const currentQ = qna[currentQuestion];

        let isCorrectAnswer = false;
        if (currentQ.type === "multiple-choice") {
            if (selectedOption === currentQ.answer) isCorrectAnswer = true;
        } else if (currentQ.type === "short-answer") {
            if (userAnswer.trim().toLowerCase() === currentQ.answer.toLowerCase()) {
                isCorrectAnswer = true;
            }
        }

        setIsCorrect(isCorrectAnswer);
        if (isCorrectAnswer) setScore((prevScore) => prevScore + 1);
        setIsAnswered(true);
    };

    const handleContinue = (event) => {

        // Move to next question if there are more questions
        if (currentQuestion < qna.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsAnswered(false);
            setSelectedOption(null);
            setUserAnswer("");
        } else {
            setIsCompleted(true);
        }

    }

    const handleStartOver = (event) => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(null);
        setIsCompleted(false);
        setScore(0);
        setUserAnswer("");
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="trivia-event-name">{title}</h2>
            <div className="quiz-box d-flex flex-column text-center justify-content-center align-items-center">

                {isCompleted ? (
                    <div>
                        <h4 className="quiz-question-h4">Quiz completed!</h4>
                        <p>Final score: {score}/{qna.length}</p>
                        <button className="form-button start-over-button" onClick={handleStartOver}>
                            Start Over
                        </button>
                    </div>
                ):(
                    <div>
                        <h4 className="quiz-question-h4">Question {currentQuestion+1}/{qna.length}: {qna[currentQuestion].name}</h4>

                        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center w-100">
                        <div className="mb-3 form-div">
                            {qna[currentQuestion].type === "multiple-choice" ? (

                                Object.values(qna[currentQuestion].options).map((option, i) => (
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
                                ))
                            ) : (
                                <Form.Control
                                    type="text"
                                    placeholder="Type your answer..."
                                    value={userAnswer}
                                    onChange={handleShortAnswerChange}
                                    className="short-answer-input"
                                />
                            )}
                        </div>


                            {isAnswered ? (
                                <div style={{position:"relative"}}>
                                    <div className={`answer-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                                            {isCorrect ? "Correct!" : "Incorrect"}
                                    </div>
                                    <button className={`form-button ${isCorrect ? "correct" : "incorrect"}`} onClick={handleContinue}>
                                        Continue
                                    </button>
                                </div>
                            ):(
                                <button 
                                    className="form-button submit-button" 
                                    disabled={qna[currentQuestion].type === "multiple-choice" ? !selectedOption : !userAnswer.trim()}
                                >
                                    Submit
                                </button>
                            )}
                        </Form>
                    </div>
                )}



            </div>
        </div>
    )
}


function Trivia () {

    const [events, setEvents] = useState([]);
    
      useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollectionRef = collection(db, "aot-ri-trivia");
            const querySnapshot = await getDocs(eventsCollectionRef);
        
            const eventsList = querySnapshot.docs.map(doc => {
                const data = doc.data();
        
                return {
                    ...data,
                    date: data.date.toDate()
                };
            });
        
            setEvents(eventsList);
        };
        fetchEvents();
      }, []);

    return (
        <div className="container text-center">
            <hr/>
            <h2 id="trivia" className="trivia-title">Trivia</h2>
            <p className="trivia-description">
                Each week, attendees test their astronomy knowledge in a fun trivia game.  
                It's a chance to learn something new—and maybe even win a prize!
            </p>

            <Carousel interval={null} controls={true} indicators={true} keyboard={false}>
                {events
                .filter(event => new Date(event.date) < new Date()) // Filter past events
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(event => {
                        const { date,title, ...eventQuestions } = event;
                        const questionsArray = Object.values(eventQuestions); // Convert object to array

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
    );
}

export default Trivia;