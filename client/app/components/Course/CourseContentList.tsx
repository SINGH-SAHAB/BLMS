import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaQuestion, FaRegFilePdf } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any; 
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  //console.log('*****DATA*****',props.data);


  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => {
      // console.log('*****type*****',item.type);
      return item.vedioSection
     })),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections
 
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
   

  return (
    <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] screen sticky top-24 left-0 z-30'}`}>
      
      {videoSections.map((section: string, sectionIndex: number) => {

        const isSectionVisible = visibleSections.has(section);

        // Filter videos by section
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length; // Number of videos in the current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => {
             // Log the videoLength property
            if(item?.lesson?.videoLength){
            totalLength= totalLength + item?.lesson?.videoLength;} // Accumulate the total length
            return totalLength;
          },
          0
        );
        const sectionStartIndex: number = totalCount; // Start index of videos within the current section
        totalCount += sectionVideoCount; // Update the total count of videos

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={section}>
            <div className="w-full flex">
              {/* Render video section */}
              <div className="w-full flex justify-between items-center"
              >
                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons ·{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index; // Calculate the video index within the overall list
                  const contentLength: number = item?.lesson?.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === props.activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item?.lesson?._id}
                      onClick={() => props.isDemo ? null : props?.setActiveVideo(videoIndex)}
                    >
                      <div className="flex items-start">
                      <div>
                        {item.type === 'lesson' && (
                        <MdOutlineOndemandVideo size={20} className="mr-2" color="black" />
                        )}
                         {item.type === 'pdf' && (
                         <FaRegFilePdf  size={20} className="mr-2" color="black" />
                         )}
                         {item.type === 'quiz' && (
                         <FaQuestion size={20} className="mr-2" color="black" />
                        //  <FaQuestion size={20} className="mr-2" color="#1cdada" />
                         )}
                      </div>
                        <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                           {item.type === 'lesson' ? item.lesson?.title :
                           item.type === 'pdf' ? item.pdf?.title:
                           item.type === 'quiz' ? item.type :
                           null /* or any default value you want to render if none of the conditions match */}
                        </h1>
                        
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {item.type === 'lesson' &&
                        (item.lesson.videoLength > 60 ?
                           `${contentLength.toFixed(2)} hours` :
                           `${item.lesson.videoLength} minutes`
                         )}
                      </h5>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;



// import React, { FC, useState } from "react";
// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
// import { MdOutlineOndemandVideo } from "react-icons/md";

// type Props = {
//   data: any; // Video content data
//   activeVideo?: number;
//   setActiveVideo?: any;
//   isDemo?: boolean;
//   testQuestions?: any[]; // Test questions data
// };

// const CourseContentList: FC<Props> = (props) => {
//   const [visibleSections, setVisibleSections] = useState<Set<string>>(
//     new Set<string>()
//   );

//   const videoSections: string[] = [
//     ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
//   ];

//   const testSection = "Test Questions";

//   const toggleSection = (section: string) => {
//     const newVisibleSections = new Set(visibleSections);
//     if (newVisibleSections.has(section)) {
//       newVisibleSections.delete(section);
//     } else {
//       newVisibleSections.add(section);
//     }
//     setVisibleSections(newVisibleSections);
//   };

//   function handleTestQuestionClick(id: any): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
//       {videoSections.map((section: string, sectionIndex: number) => (
//         <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={section}>
//           <div className="w-full flex">
//             <div className="w-full flex justify-between items-center">
//               <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
//               <button
//                 className="mr-4 cursor-pointer text-black dark:text-white"
//                 onClick={() => toggleSection(section)}
//               >
//                 {visibleSections.has(section) ? (
//                   <BsChevronUp size={20} />
//                 ) : (
//                   <BsChevronDown size={20} />
//                 )}
//               </button>
//             </div>
//           </div>
//           <h5 className="text-black dark:text-white">
//             {props.data.filter((item: any) => item.videoSection === section).length} Lessons
//           </h5>
//           <br />
//           {visibleSections.has(section) && (
//             <div className="w-full">
//               {props.data
//                 .filter((item: any) => item.videoSection === section )
//                 .map((item: any, index: number) => (
//                   <div
//                     className={`w-full ${
//                       index === props.activeVideo ? "bg-slate-800" : ""
//                     } cursor-pointer transition-all p-2`}
//                     key={item._id}
//                     onClick={() => props.isDemo ? null : props?.setActiveVideo(index)}
//                   >
//                     <div className="flex items-start">
//                       <div>
//                         <MdOutlineOndemandVideo size={25} className="mr-2" color="#1cdada" />
//                       </div>
//                       <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
//                         {item.title}
//                       </h1>
//                     </div>
//                     <h5 className="pl-8 text-black dark:text-white">
//                       {item.videoLength} minutes
//                     </h5>
                    
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       ))}

//       <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={testSection}>
//         <div className="w-full flex">
//           <div className="w-full flex justify-between items-center">
//             <h2 className="text-[22px] text-black dark:text-white">{testSection}</h2>
//             <button
//               className="mr-4 cursor-pointer text-black dark:text-white"
//               onClick={() => toggleSection(testSection)}
//             >
//               {visibleSections.has(testSection) ? (
//                 <BsChevronUp size={20} />
//               ) : (
//                 <BsChevronDown size={20} />
//               )}
//             </button>
//           </div>
//         </div>
//         {/* Additional details about the test section */}

//         {visibleSections.has(testSection) && (
//           <div className="w-full">
//             {/* Map through and render test questions */}
//             {props.testQuestions?.map((question: any, index: number) => (
//               <div
//                 className={`w-full cursor-pointer transition-all p-2`}
//                 key={question.id}
//                 onClick={() => (props.isDemo ? null : handleTestQuestionClick(question.id))}
//                 >
//                 <div className="flex items-start">
//                   <div>
//                     {/* Your test question icon */}
//                   </div>
//                   <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
//                     {question.title}
//                   </h1>
//                 </div>
//                 {/* Additional information about the test question */}
//                 <h5 className="pl-8 text-black dark:text-white">
//                   {/* Additional details */}
//                 </h5>
//               </div>
//             ))}
            
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseContentList;
