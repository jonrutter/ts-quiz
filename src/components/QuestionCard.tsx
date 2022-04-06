import React from 'react';

// types
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <div>
    <p id="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    {/* TODO: check if <p> is a valid wrapper for the markup that we get from the API */}
    <p dangerouslySetInnerHTML={{ __html: question }} />
    {answers.map((answer) => (
      <div key={answer}>
        <button
          disabled={userAnswer ? true : false}
          onClick={callback}
          value={answer}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      </div>
    ))}
  </div>
);
