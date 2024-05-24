import React from 'react';

function Question({ question, handleAnswerOptionClick }) {
  return (
    <div>
      <div className="text-2xl mb-4">{question.question}</div>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerOptionClick(option === question.correctAnswer)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
