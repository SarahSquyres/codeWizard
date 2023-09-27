import { React, useState } from 'react';
import "./Quiz.css";
import { QUERY_QUIZ } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const Quiz = () => {
    const { loading, data, error } = useQuery(QUERY_QUIZ);
    const quizzes = data?.quizzes || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Error fetching quiz data:", error);
        return <p>Error fetching quiz data.</p>;
    }

    const quiz = quizzes[currentQuestion];

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
    };
    const handleAnswerSelection = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };    

    
    return (
       <div className='quizCard'>
        <div className='quiz'>
            <div>
                <h3>{quiz.question}</h3>
                <ul className='quizChoices'>
                    {quiz.answers.map((answer, answerIndex) => (
                        <li key={answerIndex} className={`quizChoice ${selectedAnswer === answerIndex ? 'selected': ''}`}
                        onClick={() => handleAnswerSelection(answerIndex)}>
                            {answer}
                        </li>
                    ))}
                </ul>
                {currentQuestion < quizzes.length - 1 && (<button onClick={handleNextQuestion}>Next</button>)}
            </div>
        </div>
        <div className='results'>
            {currentQuestion === quizzes.length - 1 && (
                <div>
                    <p>Quiz is complete!</p>
                </div>
            )}
        </div>
    </div> 
    );
};


export default Quiz;


