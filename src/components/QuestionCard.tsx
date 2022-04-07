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
  <div className="bg-[#ebfeff] rounded-xl border-2 border-[#0085a3] p-5 shadow-md text-center text-lg">
    <p id="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} className="mb-6" />
    {answers.map((answer) => (
      <div key={answer} className="">
        <button
          disabled={userAnswer ? true : false}
          onClick={callback}
          value={answer}
          className={`${
            userAnswer ? 'cursor-default' : 'cursor-pointer hover:opacity-80'
          } select-none text-base w-full h-[40px] my-[5px] border-2 border-white shadow-md bg-gradient-to-r rounded-xl transition-all ${
            userAnswer?.correctAnswer === answer
              ? 'from-[#56ffa4] to-[#59bc86]'
              : userAnswer?.answer === answer
              ? ' from-[#ff5656] to-[#c16868]'
              : 'from-[#56ccff] to-[#6eafb4]'
          }`}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      </div>
    ))}
  </div>
);
