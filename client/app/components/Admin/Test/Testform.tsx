// components/TestForm.js
// import { useState } from "react";
'use client'
import { userAgent } from "next/server";
// import TestModel from "../../../../../server/models/test.Model";
import "./testForm.css"
import { useState, useEffect } from "react";
import React from "react";

type Props = {}

const TestForm = (props: Props) =>{
  const [active, setActive] = useState(0);
  const [testInfo, setTestInfo] = useState({

         courseId:"",
        videoId:"",
        question:"",
        correctAnswer:""
  });
  const [options, setOption] = useState([{ options:"",
}])
 

  return (
    <div className="w-full flex min-h-screen">

    </div>
  )
}






















// useEffect(() => {
//   // Fetch courses when the component mounts
//   const fetchCourses = async () => {
//     try {
//       const response = await fetch("/api/courses"); // Adjust the endpoint URL
//       const data = await response.json();
//       setCourses(data.courses); // Assuming the response structure has a "courses" property
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   fetchCourses();
// }, []); 

// const TestForm = () => {
//   const [courseId, setCourseId] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctAnswer, setCorrectAnswer] = useState("");
  

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     try {
//       const newTest = new TestModel({
//         courseId,
//         videoId,
//         question,
//         options,
//         correctAnswer,
//       });

//       await newTest.save();
//       alert("Test added successfully!");
//     } catch (error) {
//       console.error("Error adding test:", error);
//       alert("Failed to add test. Check console for details.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Course ID:
//         <select
//           value={courseId}
//           onChange={(e) => setCourseId(e.target.value)}
//         >
//           <option value="" disabled>Select a course</option>
//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />

//       <label>
//         Video ID:
//         <input
//           type="text"
//           value={videoId}
//           onChange={(e) => setVideoId(e.target.value)}
//         />
//       </label>
//       <br />

//       <label>
//         Question:
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//       </label>
//       <br />

//       <label>
//         Options:
//         {options.map((option, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={option}
//               onChange={(e) => {
//                 const newOptions = [...options];
//                 newOptions[index] = e.target.value;
//                 setOptions(newOptions);
//               }}
//             />
//           </div>
//         ))}
//       </label>
//       <br />

//       <label>
//         Correct Answer:
//         <select
//           value={correctAnswer}
//           onChange={(e) => setCorrectAnswer(e.target.value)}
//         >
//           {options.map((option, index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />

//       <button type="submit">Add Test</button>
//     </form>
//   );
// };

export default TestForm;
