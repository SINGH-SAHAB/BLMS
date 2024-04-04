// components/QuizComponent.js

import { useState } from 'react';
import styles from './QuizComponent.module.css';

const QuizComponent = () => {
  const [mcqAnswers, setMCQAnswers] = useState({});
  const [fillInAnswers, setFillInAnswers] = useState({});

  const handleMCQChange = (questionId: string, option: string) => {
    setMCQAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleFillInChange = (questionId: string, answer: string) => {
    setFillInAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    // Handle the submission of answers
    console.log('MCQ Answers:', mcqAnswers);
    console.log('Fill-In Answers:', fillInAnswers);
  };

  return (
    <div className={styles.quizContainer}>
      {/* MCQ Section */}
      <div className={styles.questionSection}>
        <h2>Multiple Choice Questions</h2>
        <div className={styles.question}>
          <p>What is the capital of France?</p>
          <div className={styles.options}>
            <label>
              <input
                type="radio"
                name="mcq1"
                value="paris"
                onChange={() => handleMCQChange('mcq1', 'paris')}
              />
              Paris
            </label>
            <label>
              <input
                type="radio"
                name="mcq1"
                value="berlin"
                onChange={() => handleMCQChange('mcq1', 'berlin')}
              />
              Berlin
            </label>
            <label>
              <input
                type="radio"
                name="mcq1"
                value="rome"
                onChange={() => handleMCQChange('mcq1', 'rome')}
              />
              Rome
            </label>
          </div>
        </div>
        {/* Add more MCQ questions as needed */}
      </div>

      {/* Fill-In Section */}
      <div className={styles.questionSection}>
        <h2>Fill-In-The-Blank Questions</h2>
        <div className={styles.question}>
          <p>My favorite programming language is ____________.</p>
          <input
            type="text"
            className={styles.textInput} // Use the local class
            onChange={(e) => handleFillInChange('fillIn1', e.target.value)}
          />
        </div>
        {/* Add more fill-in questions as needed */}
      </div>

      {/* Submission Button */}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Answers
      </button>
    </div>
  );
};

export default QuizComponent;
