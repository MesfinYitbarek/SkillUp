import React from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';

export default function Result() {
  const dispatch = useDispatch();
  const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "Passed" : "Failed"
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container mx-auto text-center py-10 px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold text-gray-800 mb-5">Quiz Application</h1>
  
    <div className="result flex flex-col items-center mb-5">
      <div className="flex justify-between w-full mb-2 max-w-md">
        <span>Username</span>
        <span className="font-bold">{userId || ""}</span>
      </div>
      <div className="flex justify-between w-full mb-2 max-w-md">
        <span>Total Quiz Points :</span>
        <span className="font-bold">{totalPoints || 0}</span>
      </div>
      <div className="flex justify-between w-full mb-2 max-w-md">
        <span>Total Questions :</span>
        <span className="font-bold">{queue.length || 0}</span>
      </div>
      <div className="flex justify-between w-full mb-2 max-w-md">
        <span>Total Attempts :</span>
        <span className="font-bold">{attempts || 0}</span>
      </div>
      <div className="flex justify-between w-full mb-2 max-w-md">
        <span>Total Earn Points :</span>
        <span className="font-bold">{earnPoints || 0}</span>
      </div>
      <div className="flex justify-between w-full mb-2 max-w-md">
        <span>Quiz Result</span>
        <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} className="font-bold">{flag ? "Passed" : "Failed"}</span>
      </div>
    </div>
  
    <div className="start mb-5">
      <Link className="btn bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out" to='/app' onClick={onRestart}>Restart</Link>
    </div>
  
    <div className="container mx-auto">
      <ResultTable />
    </div>
  </div>
    );
}
