import React, { useState } from 'react';

// api
import { fetchQuizQuestions } from './api';

// components
import { QuestionCard } from './components/QuestionCard';

// types
import { Difficulty, QuestionState } from './api';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const TOTAL_QUESTIONS = 10;

  console.log(questions);

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);

    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // get user answer
      const answer = e.currentTarget.value;

      // check user answer against correct answer
      const correctAnswer = questions[number].correct_answer;
      const correct = correctAnswer === answer;
      // increment score if correct
      if (correct) setScore((prev) => prev + 1);
      // save answer
      const newAnswer = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer,
      };
      setUserAnswers((answers) => [...answers, newAnswer]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div>
      <h1>React Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button id="start" onClick={startGame}>
          Start
        </button>
      )}
      {!gameOver && <p id="score">Score: {score}</p>}
      {loading && <p id="loading">Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button id="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
