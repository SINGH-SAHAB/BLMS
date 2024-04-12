import { useState } from 'react';
import { useMutation } from 'react-query';
import { useCreateCategoriesMutation, useCreateLevelsMutation } from '../../../../redux/features/layout/api';
import { Category, Level } from './types';

const CreateCategoriesAndLevels = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [createCategories] = useCreateCategoriesMutation();
  const [createLevels] = useCreateLevelsMutation(); // Corrected mutation hook name

  const handleAddCategory = () => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { _id: `temp-${Date.now()}`, title: '' },
    ]);
  };

  const handleCategoryChange = (id: string, title: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((c) => (c._id === id ? { ...c, title } : c))
    );
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((c) => c._id !== id)
    );
  };

  const handleAddLevel = () => {
    setLevels((prevLevels) => [
      ...prevLevels,
      { _id: `temp-${Date.now()}`, title: '' },
    ]);
  };

  const handleLevelChange = (id: string, title: string) => {
    setLevels((prevLevels) =>
      prevLevels.map((l) => (l._id === id ? { ...l, title } : l))
    );
  };

  const handleDeleteLevel = (id: string) => {
    setLevels((prevLevels) =>
      prevLevels.filter((l) => l._id !== id)
    );
  };

  const handleSaveCategories = async () => {
    try {
      await createCategories({
        type: 'Categories',
        categories,
      });
  
      // Optionally, you can refetch data or perform other actions after saving
    } catch (error) {
      console.error('Error creating categories:', error);
      // Handle error as needed
    }
  };

  const handleSaveLevels = async () => {
    try {
      await createLevels({
        type: 'Level',
        levels,
      });
  
      // Optionally, you can refetch data or perform other actions after saving
    } catch (error) {
      console.error('Error creating levels:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <div>
        <h2>Categories</h2>
        {categories.map((category) => (
          <div key={category._id}>
            <input
              type="text"
              value={category.title}
              onChange={(e) => handleCategoryChange(category._id, e.target.value)}
            />
            <button onClick={() => handleDeleteCategory(category._id)}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={handleAddCategory}>Add Category</button>
        <button onClick={handleSaveCategories}>Save Categories</button>
      </div>
      
      <div>
        <h2>Levels</h2>
        {levels.map((level) => (
          <div key={level._id}>
            <input
              type="text"
              value={level.title}
              onChange={(e) => handleLevelChange(level._id, e.target.value)}
            />
            <button onClick={() => handleDeleteLevel(level._id)}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={handleAddLevel}>Add Level</button>
        <button onClick={handleSaveLevels}>Save Levels</button>
      </div>
    </div>
  );
};

export default CreateCategoriesAndLevels;
