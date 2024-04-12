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
  // const types = data?.layout ? Object.keys(data.layout) : [];

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    // if (data) {
    //   setCategories(data.layout.categories);
    // }

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





const EditLevels = (props: Props) => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("Levels", {
    refetchOnMountOrArgChange: true,
  });
  // const types = data?.layout ? Object.keys(data.layout) : [];

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [levels, setLevels] = useState<any>([]);

  useEffect(() => {
    // if (data) {
    //   setCategories(data.layout.categories);
    // }

    if (data && data.layout ) {
      setLevels(data.layout.levels || []);
    } 
    else {
      // If data.layout.categories is null, set an empty array as a default value
      setLevels([]);
    }
    if (layoutSuccess) {
        refetch();
      toast.success("Levels updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error,refetch]);

  const handleLevelsAdd = (id: any, value: string) => {
    setLevels((prevLevel: any) =>
      prevLevel.map((j: any) => (j._id === id ? { ...j, title: value } : j))
    );
  };

  const newLevelsHandler = () => {
    if (levels[levels.length - 1].title === "") {
      toast.error("Level title cannot be empty");
    } else {
      setLevels((prevLevel: any) => [...prevLevel, { title: "" }]);
    }
  };

  const areLevelUnchanged = (
    originalLevels: any[],
    newLevels: any[]
  ) => {
    return JSON.stringify(originalLevels) === JSON.stringify(newLevels);
  };

  const isAnyLevelTitleEmpty = (levels: any[]) => {
    return levels.some((p) => p.title === "");
  };

  const editLevelsHandler = async () => {
    if (
      !areLevelUnchanged(data.layout.levels, levels) &&
      !isAnyLevelTitleEmpty(levels)
    ) {
      await editLayout({
        type: "Levels",
        levels,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Levels</h1>
          {levels &&
            levels.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleLevelsAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setLevels((prevCategory: any) =>
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
              onClick={newLevelsHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areLevelUnchanged(data.layout.levels, levels) ||
              isAnyLevelTitleEmpty(levels)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areLevelUnchanged(data.layout.levels, levels) ||
              isAnyLevelTitleEmpty(levels)
                ? () => null
                : editLevelsHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};


export { EditCategories, EditLevels };