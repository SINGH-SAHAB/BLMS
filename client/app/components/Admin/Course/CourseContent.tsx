import { styles } from "@/app/styles/style";
import React, { FC, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { boolean } from "yup";

type Props = {
  optionsArraytest: { optionText: string; isCorrect: boolean }[];
  setOptionsArraytest: (
    optionsArray: { optionText: string; isCorrect: boolean }[]
  ) => void;
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  optionsArraytest,
  setOptionsArraytest,
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [dragging, setDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseContentData({ ...courseContentData, notes: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleAddTestQuestions = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].testsQuestions.question.push({
      optionText: "",
      isCorrect: boolean,
    });
    setCourseContentData(updatedData);
  };

  const handleRemoveTestQuestions = (index: number, questionsIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].testsQuestions.splice(questionsIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseContentData({ ...courseContentData, notes: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // adding here a handle to remove the test
  const handleRemoveTest = (index: number, testQuestionsIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].testsQuestions.splice(testQuestionsIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddTest = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].testsQuestions.push({ question: "", marks: 0 });
    setCourseContentData(updatedData);
  };

  const handleOptionsChange = (index: number, value: any) => {
    const updateOptions = [...courseContentData.testQuestions];
    updateOptions[index].optionText = value;
    setCourseContentData(updateOptions);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === "" ||
      item.testsQuestions[0].question === "" ||
      // item.testsQuestions[0].option === "" ||
      item.testsQuestions[0].currectAnswer === "" ||
      item.testsQuestions[0].marks === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        videoLength: "",
        links: [{ title: "", url: "" }],
        testsQuestions: [
          {
            question: "",
            options: ["", "", "", ""],
            currectAnswer: "",
            marks: 0,
          },
        ],
        notes:[
          {
          courseName: "",
        title: "",
        notes: [
          {
            public_id: "",
            url: "",
          },
        ],
          }
        ],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === "" ||
      courseContentData[courseContentData.length - 1].testsQuestions[0]
        .question === "" ||
      // courseContentData[courseContentData.length - 1].testsQuestions[0]
      //   .option === "" ||
      courseContentData[courseContentData.length - 1].testsQuestions[0]
        .currectAnswer === "" ||
      courseContentData[courseContentData.length - 1].testsQuestions[0]
        .marks === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
        testsQuestions: [
          {
            question: "",
            options: [{ optionText: "", isCorrect: boolean }],
            currectAnswer: "",
            marks: 0,
          },
        ],
        notes:[
          {
          courseName: "",
        title: "",
        notes: [
          {
            public_id: "",
            url: "",
          },
        ],
          }
        ],
        
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === "" ||
      courseContentData[courseContentData.length - 1].testsQuestions[0]
        .question === "" ||
      // courseContentData[courseContentData.length - 1].testsQuestions[0]
      //   .option === "" ||
      courseContentData[courseContentData.length - 1].testsQuestions[0]
        .currectAnswer === "" ||
      courseContentData[courseContentData.length - 1].testsQuestions[0]
        .marks === ""
    ) {
      toast.error("section can't be empty!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
                key={index}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}

                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* // arrow button for collasped video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="sdder"
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>

                    <div className="w-full">
                      <label className={styles.label}>
                        Add the Notes {index + 1}
                      </label>
                    </div>
                    <br />

                    <input
            type="file"
            // accept="image/*"
            accept=".pdf"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {item.notes ? (
              // <img
              //   src={item.notes}
              //   alt=""
              //   className="max-h-full w-full object-cover"
              // />
              <iframe
              title={item.title}
              src={item.notes}
               className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your notes here or click to browse
              </span>
            )}
          </label>


                    {/* ADD The Test Content HERE */}
                    {item?.testsQuestions.map(
                      (testQuestions: any, testQuestionsIndex: number) => (
                        <div className="mb-3 block" key={testQuestionsIndex}>
                          <label className={styles.labelBig}>Add Test</label>
                          <div className="w-full flex items-center justify-between">
                            <label className={styles.label}>
                              Test {testQuestionsIndex + 1}
                            </label>
                            <AiOutlineDelete
                              className={`${
                                testQuestionsIndex === 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              } text-black dark:text-white text-[20px]`}
                              onClick={() =>
                                testQuestionsIndex === 0
                                  ? null
                                  : handleRemoveTest(index, testQuestionsIndex)
                              }
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Enter the test's Question"
                            className={`${styles.input}`}
                            value={testQuestions.question}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].testsQuestions[
                                testQuestionsIndex
                              ].question = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />

                          {/* <input type="text"
                           placeholder="option 1"
                           className={`${styles.input}`}
                           value={testQuestions.options.optionText}
                           onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].testsQuestions[testQuestionsIndex].options.optionText = e.target.value;
                            setCourseContentData(updatedData);
                           }}
                          />
                          <input type="text"
                          placeholder="option 2"
                          className={`${styles.input}`}
                          value={testQuestions.options.optionText}
                          onChange={(e) => {
                           const updatedData = [...courseContentData];
                           updatedData[index].testsQuestions[testQuestionsIndex].options = e.target.value;
                           setCourseContentData(updatedData);
                          }}
                         />
                         <input type="text"
                         placeholder="option 3"
                         className={`${styles.input}`}
                         value={testQuestions.options.optionText}
                         onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].testsQuestions[testQuestionsIndex].options = e.target.value;
                          setCourseContentData(updatedData);
                         }}
                        />

                         <input type="text"
                           placeholder="option 4"
                           className={`${styles.input}`}
                           value={testQuestions.options.optionText}
                           onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].testsQuestions[testQuestionsIndex].options = e.target.value;
                            setCourseContentData(updatedData);
                           }}
                          /> */}
                          <input
                            type="text"
                            placeholder="Enter the test currecrAnswer"
                            className={`${styles.input}`}
                            value={testQuestions.currectAnswer}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].testsQuestions[
                                testQuestionsIndex
                              ].currectAnswer = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Enter the answer Marks"
                            className={`${styles.input}`}
                            value={testQuestions.marks}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].testsQuestions[
                                testQuestionsIndex
                              ].marks = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>
                      )
                    )}
                    <br />
                    {/* Add test button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddTest(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Test
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}

        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />

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
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
