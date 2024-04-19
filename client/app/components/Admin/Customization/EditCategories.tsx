import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data && data.layout ) {
      setCategories(data.layout.categories || []);
    } 
    else {
      // If data.layout.categories is null, set an empty array as a default value
      setCategories([]);
    }
    if (layoutSuccess) {
        refetch();
      toast.success("Categories updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error,refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;




// import { useGetHeroDataQuery, useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/style";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { toast } from "react-hot-toast";

// type Props = {};

// const EditCategories = (props: Props) => {
//   const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
//     refetchOnMountOrArgChange: true,
//   });

//   const [createLayout] = useEditLayoutMutation();
//   const [categories, setCategories] = useState<any>([]);

//   useEffect(() => {
//     if (data && data.layout) {
//       setCategories(data.layout.categories || []);
//     } else {
//       setCategories([]);
//     }
//   }, [data]);

//   const handleCategoriesAdd = (id: any, value: string) => {
//     setCategories((prevCategory: any) =>
//       prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
//     );
//   };

//   const newCategoriesHandler = async () => {
//     try {
//       if (!data.layout) {
//         // If layout doesn't exist, create a new layout
//         await createLayout({
//           type: "Categories",
//           categories: [],
//         });
//         refetch();
//       }

//       setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
//     } catch (error) {
//       console.error("Error creating layout:", error);
//       toast.error("Failed to create layout");
//     }
//   };

//   const editCategoriesHandler = async () => {
//     try {
//       if (data.layout) {
//         await createLayout({
//           type: "Categories",
//           categories,
//         });
//         refetch();
//         toast.success("Categories updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating categories:", error);
//       toast.error("Failed to update categories");
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-[120px] text-center">
//           <h1 className={`${styles.title}`}>All Categories</h1>
//           {categories &&
//             categories.map((item: any, index: number) => (
//               <div className="p-3" key={index}>
//                 <div className="flex items-center w-full justify-center">
//                   <input
//                     className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
//                     value={item.title}
//                     onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
//                     placeholder="Enter category title..."
//                   />
//                   <AiOutlineDelete
//                     className="dark:text-white text-black text-[18px] cursor-pointer"
//                     onClick={() => {
//                       setCategories((prevCategory: any) =>
//                         prevCategory.filter((i: any) => i._id !== item._id)
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           <br />
//           <br />
//           <div className="w-full flex justify-center">
//             <IoMdAddCircleOutline
//               className="dark:text-white text-black text-[25px] cursor-pointer"
//               onClick={newCategoriesHandler}
//             />
//           </div>
//           <div
//             className={`${
//               styles.button
//             } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
//             ${
//               !data.layout || data.layout.categories.length === 0
//                 ? "!cursor-not-allowed"
//                 : "!cursor-pointer !bg-[#42d383]"
//             }
//             !rounded absolute bottom-12 right-12`}
//             onClick={
//               !data.layout || data.layout.categories.length === 0
//                 ? () => null
//                 : editCategoriesHandler
//             }
//           >
//             Save
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditCategories;


// import { useGetHeroDataQuery, useEditLayoutMutation , useCreateLayoutQuery} from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import Loader from "../../Loader/Loader";
// import { styles } from "@/app/styles/style";
// import { AiOutlineDelete } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { toast } from "react-hot-toast";

// type Props = {
//   layoutType: string; // 'Categories' or 'FAQs'
// };



// const EditLayout = ({ layoutType }: Props) => {
//   const { data, isLoading, refetch } = useGetHeroDataQuery(layoutType, {
//     refetchOnMountOrArgChange: true,
//   });

//   const [editLayout] = useEditLayoutMutation();
//   const [items, setItems] = useState<any>([]);

//   useEffect(() => {
//     if (data && data.layout) {
//       setItems(data.layout[layoutType.toLowerCase()] || []);
//     } else {
//       setItems([]);
//     }
//   }, [data, layoutType]);

//   const handleItemAdd = (id: any, value: string) => {
//     setItems((prevItems: any) =>
//       prevItems.map((i: any) => (i._id === id ? { ...i, title: value } : i))
//     );
//   };

  
//   const newItemHandler = async () => {
//     try {
//       if (!data.layout) {
//         // If layout doesn't exist, create a new layout
//         const layoutData: any = {};
//         layoutData[layoutType.toLowerCase()] = [];
//         await editLayout(layoutData);
//         refetch();
//       }

//       setItems((prevItems: any) => [...prevItems, { title: "" }]);
//     } catch (error) {
//       console.error("Error creating layout:", error);
//       toast.error(`Failed to create ${layoutType}`);
//     }
//   };

//   const editItemsHandler = async () => {
//     try {
//       if (data.layout) {
//         const layoutData: any = {};
//         layoutData[layoutType.toLowerCase()] = items;

//         await editLayout(layoutData);
//         refetch();
//         toast.success(`${layoutType} updated successfully`);
//       }
//     } catch (error) {
//       console.error(`Error updating ${layoutType}:`, error);
//       toast.error(`Failed to update ${layoutType}`);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-[120px] text-center">
//           <h1 className={`${styles.title}`}>All {layoutType}</h1>
//           {items &&
//             items.map((item: any, index: number) => (
//               <div className="p-3" key={index}>
//                 <div className="flex items-center w-full justify-center">
//                   <input
//                     className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
//                     value={item.title}
//                     onChange={(e) => handleItemAdd(item._id, e.target.value)}
//                     placeholder={`Enter ${layoutType} title...`}
//                   />
//                   <AiOutlineDelete
//                     className="dark:text-white text-black text-[18px] cursor-pointer"
//                     onClick={() => {
//                       setItems((prevItems: any) =>
//                         prevItems.filter((i: any) => i._id !== item._id)
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           <br />
//           <br />
//           <div className="w-full flex justify-center">
//             <IoMdAddCircleOutline
//               className="dark:text-white text-black text-[25px] cursor-pointer"
//               onClick={newItemHandler}
//             />
//           </div>
//           <div
//             className={`${
//               styles.button
//             } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
//             ${
//               !data.layout || items.length === 0
//                 ? "!cursor-not-allowed"
//                 : "!cursor-pointer !bg-[#42d383]"
//             }
//             !rounded absolute bottom-12 right-12`}
//             onClick={
//               !data.layout || items.length === 0
//                 ? () => null
//                 : editItemsHandler
//             }
//           >
//             Save
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditLayout;

