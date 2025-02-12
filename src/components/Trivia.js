import React, {useState} from "react";
import "../assets/Trivia.css";
import { Form, Button } from "react-bootstrap";


function TriviaQuiz () {
    const qna = [
        {
            name: "What is the capital of Canada?",
            options: ["Toronto", "Ottawa", "Montreal"],
            answer: "Ottawa"
        },
        {
            name: "What is the capital of Russia?",
            options: ["Moscow", "Saint Petersburg"],
            answer: "Moscow"
        },
        {
            name: "What is the capital of France?",
            options: ["Marseille", "Lyon", "Paris"],
            answer: "Paris"
        },
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedOption) return;

        if (selectedOption === qna[currentQuestion].answer) {
            setIsCorrect(true);
            setScore((prevScore) => prevScore + 1);
        } else {
            setIsCorrect(false);
        }

        setIsAnswered(true);
    };

    const handleContinue = (event) => {

        // Move to next question if there are more questions
        if (currentQuestion < qna.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setIsCompleted(true);
        }

    }

    return (
        <div className="justify-content-center align-items-center">
            <h2>AoT Rhode Island #1 Trivia</h2>
            <div className="quiz-box d-flex text-center justify-content-center align-items-center">

                {isCompleted ? (
                    <div>
                        <h4>Quiz completed!</h4>
                        <p>Final score: {score}/{qna.length}</p>
                        <Button>
                            Start Over
                        </Button>
                    </div>
                ):(
                    <div>
                        <h4 className="quiz-question-h4">Question {currentQuestion+1}/{qna.length}: {qna[currentQuestion].name}</h4>

                        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100">
                            <div className="mb-3 form-div">

                            {qna[currentQuestion].options.map((option, i) => (
                                <Form.Check
                                    key={i}
                                    type="radio"
                                    id={`question-${currentQuestion}-option-${i}`}
                                    label={option}
                                    name={`question-${currentQuestion}`}
                                    value={option}
                                    onChange={handleOptionChange}
                                    checked={selectedOption === option}
                                    className="d-flex"
                                />
                            ))}
                            </div>

                            {isAnswered ? (
                                <>
                                    <div className={`answer-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                                            {isCorrect ? "Correct!" : "Incorrect"}
                                    </div>
                                    <Button variant="success" type="submit" onClick={handleContinue}>
                                        Continue
                                    </Button>
                                </>
                            ):(
                                <Button variant="primary" type="submit" disabled={!selectedOption}>
                                    Submit
                                </Button>
                            )}


                        </Form>
                    </div>
                )}



            </div>
        </div>
    )
}


function Trivia () {
    return (
        <div className="container text-center">
            <hr/>
            <h2 id="trivia">Trivia</h2>
            <p>
                Each week, attendees test their astronomy knowledge in a fun trivia game.  
                It's a chance to learn something new—and maybe even win a prize!
            </p>

            <TriviaQuiz />
        </div>
    );
}

export default Trivia;