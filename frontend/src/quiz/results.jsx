import React from 'react';

function Result({ score, totalQuestions }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-4">Quiz Complete!</div>
      <div className="text-xl mb-4">
        You scored {score} out of {totalQuestions}.
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;
