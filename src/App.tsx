import React, { useState } from 'react';

// api
import { fetchQuizQuestions } from './api';

// components
import { QuestionCard } from './components/QuestionCard';
import { Button } from './components/Button';

// types
import { Difficulty, QuestionState } from './api';

// image
import BackgroundImage from './images/background.jpg';

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
    <main
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
      }}
      className={`w-full min-h-screen h-full overflow-x-hidden px-6 py-8`}
    >
      <header className="text-center">
        <h1 className="font-heading text-7xl bg-gradient-to-b from-white to-[#85f1ff] bg-clip-text text-transparent [--wekipt-text-fill-color:_transparent] drop-shadow-md text-center uppercase mb-16">
          React Quiz
        </h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <Button onClick={startGame}>Start</Button>
        )}
      </header>
      {!gameOver && (
        <p id="score" className="text-white text-[2rem] text-center mb-4">
          Score: {score}
        </p>
      )}
      <div className="max-w-screen-md mx-auto">
        {loading && (
          <div
            id="loading"
            className="w-full h-full flex items-center justify-center"
          >
            <div className="rounded-full w-16 h-16 border-4 border-t-transparent border-white animate-spin" />
          </div>
        )}
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
          <Button onClick={nextQuestion}>Next</Button>
        ) : null}
      </div>
    </main>
  );
};

export default App;
