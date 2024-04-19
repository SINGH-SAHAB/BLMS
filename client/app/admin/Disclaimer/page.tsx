import Link from 'next/link';
import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div style={DisclaimerContainer}>
      <div style={AdditionalSection}>
        <div style={IconContainer}>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" style={{marginRight: '1px'}}>
            <circle cx="12" cy="12" r="4" fill="#FC5D55"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" style={{marginRight: '1px'}}>
            <circle cx="12" cy="12" r="4" fill="#FBB835"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" fill="#27C443"/>
          </svg>
        </div>
      </div>
      <div style={DisclaimerSection}>
      
        <h1 style={{color:'red', marginTop:'0', marginLeft:'0'}}>Disclaimer</h1>
        <h2 style={{color:'black', marginTop:'10px',marginLeft:'10px'}}> Course Upload Tips</h2> 
        <ol style={{marginLeft: '50px',marginTop:'20px', color: 'black'}}>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 700x430.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Prerequisites refers to the fundamental courses to complete before taking this particular course.</li>
        </ol>
        <Link href="./create-course" style={{color:'black'}} > 
        <button style={{marginTop:'40px', marginLeft:'1000px', marginBottom:'20px', background:'white', border:'3px solid #4A90E2',padding: '20px',width:'10%', transitionDuration: '0.4s'}} className="button">Submit</button> 
        </Link> 
      </div>
    </div>
  );
}

export default DisclaimerPage;

const DisclaimerContainer: React.CSSProperties = {
  backgroundColor: 'white',
  color: 'black',
  border: '20px solid #4A90E2', // Border with color #4A90E2
};


const DisclaimerSection: React.CSSProperties = {
  padding: '20px',
};

const AdditionalSection: React.CSSProperties = {
  backgroundColor: '#E8E8E8',
  padding: '10px',
  display: 'flex',
  alignItems: 'center', 
};

const IconContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center', // Align items vertically centered
};
