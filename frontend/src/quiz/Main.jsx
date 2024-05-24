import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link  } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';

export default function Qain() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  ;

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
     
    }
  }

  return (
    <div className="container mx-auto text-center py-10 px-4 sm:px-6 lg:px-8">
  <h1 className="text-4xl font-bold text-gray-800 mb-5">Quiz Application</h1>

  <ol className="text-left mb-5 list-decimal list-inside space-y-2 text-lg text-gray-600">
    <li>You will be asked 10 questions one after another.</li>
    <li>10 points are awarded for the correct answer.</li>
    <li>Each question has three options. You can choose only one option.</li>
    <li>You can review and change answers before the quiz finishes.</li>
    <li>The result will be declared at the end of the quiz.</li>
  </ol>

  <form id="form" className="mb-5 flex justify-center">
    <input
      ref={inputRef}
      className="userid border border-gray-300 p-2 rounded w-full max-w-xs"
      type="text"
      placeholder="Username*"
    />
  </form>

  <div>
    <Link 
      className="btn bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
      to="/quiz" 
      onClick={startQuiz}
    >
      Start Quiz
    </Link>
  </div>
</div>


  );
}
