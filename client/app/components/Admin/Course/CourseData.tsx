// import { styles } from "@/app/styles/style";
// import React, { FC } from "react";
// import {AiOutlinePlusCircle} from "react-icons/ai";
// import { toast } from "react-hot-toast";

// type Props = {
//   benefits: { title: string }[];
//   setBenefits: (benefits: { title: string }[]) => void;
//   prerequisites: { title: string }[];
//   setPrerequisites: (prerequisites: { title: string }[]) => void;
//   active: number;
//   setActive: (active: number) => void;
// };

// const CourseData: FC<Props> = ({
//   benefits,
//   setBenefits,
//   prerequisites,
//   setPrerequisites,
//   active,
//   setActive,
// }) => {

//   const handleBenefitChange = (index: number, value: any) => {
//     const updatedBenefits = [...benefits];
//     updatedBenefits[index].title = value;
//     setBenefits(updatedBenefits);
//   };

//   const handleAddBenefit = () => {
//     setBenefits([...benefits, { title: "" }]);
//   };

//   const handlePrerequisitesChange = (index: number, value: any) => {
//     const updatedPrerequisites = [...prerequisites];
//     updatedPrerequisites[index].title = value;
//     setPrerequisites(updatedPrerequisites);
//   };

//   const handleAddPrerequisites = () => {
//     setPrerequisites([...prerequisites, { title: "" }]);
//   };

//   const prevButton = () => {
//     setActive(active - 1);
//   }

//   const handleOptions = () => {
//     if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
//       setActive(active + 1);
//     } else{
//         toast.error("Please fill the fields for go to next!")
//     }
//   };
  

//   return (
//     <div className="w-[80%] m-auto mt-24 block">
//       <div>
//         <label className={`${styles.label} text-[20px]`} htmlFor="email">
//           What are the benefits for students in this course?
//         </label>
//         <br /> 
//         {benefits.map((benefit: any, index: number) => (
//           <input
//             type="text"
//             key={index}
//             name="Benefit"
//             placeholder="You will be able to build a full stack LMS Platform..."
//             required
//             className={`${styles.input} my-2`}
//             value={benefit.title}
//             onChange={(e) => handleBenefitChange(index, e.target.value)}
//           />
//         ))}
//         <AiOutlinePlusCircle
//           style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
//           onClick={handleAddBenefit}
//         />
//       </div>

//       <div>
//         <label className={`${styles.label} text-[20px]`} htmlFor="email">
//         What are the prerequisites for starting this course?
//         </label>
//         <br />
//         {prerequisites.map((prerequisites: any, index: number) => (
//           <input
//             type="text"
//             key={index}
//             name="prerequisites"
//             placeholder="You need basic knowledge of MERN stack"
//             required
//             className={`${styles.input} my-2`}
//             value={prerequisites.title}
//             onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
//           />
//         ))}
//         <AiOutlinePlusCircle
//           style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}

//           onClick={handleAddPrerequisites}
//         />
//       </div>
//       <div className="w-full flex items-center justify-between">
//       <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => prevButton()}
//         >
//           Prev
//         </div>
//         <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => handleOptions()}
//         >
//           Next
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseData;

import { styles } from "@/app/styles/style";
import React, { FC,useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import FormattingDetails from "./FormattingDetails";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  targetAudience: { title: string }[];
  setTargetAudience: (targetAudience: { title: string }[]) => void;
  materialIncluded: { title: string }[];
  setMaterialIncluded: (materialIncluded: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  targetAudience,
  setTargetAudience,
  materialIncluded,
  setMaterialIncluded,
  active,
  setActive,
}) => {
  const [formattingVisible, setFormattingVisible] = useState<boolean>(false); // State to track visibility of formatting options

  const toggleFormatting = () => {
    setFormattingVisible(!formattingVisible);
  };

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleTargetAudienceChange = (index: number, value: any) => {
    const updatedTargetAudience = [...targetAudience];
    updatedTargetAudience[index].title = value;
    setTargetAudience(updatedTargetAudience);
  };

  const handleMaterialIncludedChange = (index: number, value: any) => {
    const updatedMaterialIncluded = [...materialIncluded];
    updatedMaterialIncluded[index].title = value;
    setMaterialIncluded(updatedMaterialIncluded);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== "" &&
      targetAudience[targetAudience.length - 1]?.title !== "" &&
      materialIncluded[materialIncluded.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields to go to the next step!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="benefits">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <div key={index}>
          <textarea
            name="benefits"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
          {formattingVisible && (
              <FormattingDetails onSelectFormatting={(formatting) => handleBenefitChange(index, formatting)} />
            )}
         
        </div>
          
        ))}
      </div>
      <button onClick={toggleFormatting}>Toggle Formatting Options</button>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="prerequisites">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <textarea
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="targetAudience">
          Who is the target audience for this course?
        </label>
        <br />
        {targetAudience.map((audience: any, index: number) => (
          <textarea
            key={index}
            name="targetAudience"
            placeholder="Developers, Students, Professionals, etc."
            required
            className={`${styles.input} my-2`}
            value={audience.title}
            onChange={(e) => handleTargetAudienceChange(index, e.target.value)}
          />
        ))}
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="materialIncluded">
          What material is included in this course?
        </label>
        <br />
        {materialIncluded.map((material: any, index: number) => (
          <textarea
            key={index}
            name="materialIncluded"
            placeholder="Video lectures, Assignments, Quizzes, etc."
            required
            className={`${styles.input} my-2`}
            value={material.title}
            onChange={(e) => handleMaterialIncludedChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
