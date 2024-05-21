// Score.js

import React from 'react'

const Score = ({ score, setScore, 
			setCurrentQuestion, setQuizStarted, 
			setIsLastq, setTimer}) => {
	return (
	<div>
		<div className="card-body">
			<h2 className="card-title">Quiz Completed!</h2>
			<h4 className="card-text">Your score: {score}</h4>
			<button className="btn btn-primary"
					onClick={() => { setCurrentQuestion(0); 
						setScore(0); setQuizStarted(true); 
						setIsLastq(false); setTimer(10);}}>
						Restart Quiz
			</button>
		</div>
	</div>
	)
}

export default Score;
