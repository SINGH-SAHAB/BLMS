import React, { useState } from 'react';

const QuizPage: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const startQuiz = () => {
    // Logic to start the quiz
    // For now, just show the quiz
    setShowQuiz(true);
  };

  return (
    <div>
      {!showQuiz ? (
        <div>
          <h1>Welcome to the Quiz</h1>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <p>Question 1: What is the capital of France?</p>
          {/* Input field for the answer */}
          <input type="text" id="answer" />
          {/* Button to submit the answer */}
          <button onClick={() => alert('Coming soon')}>Submit Answer</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
