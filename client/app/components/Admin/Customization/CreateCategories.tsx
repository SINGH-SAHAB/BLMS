// CreateCategories.tsx
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useCreateLayoutMutation } from '../../../../redux/features/layout/api';
import { Category, CreateCategoriesPayload } from './types';

const CreateCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [createLayout] = useCreateLayoutMutation();

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

  const handleSaveCategories = async () => {
    try {
      await createLayout({
        type: 'Categories',
        categories,
      });
  
      // Optionally, you can refetch data or perform other actions after saving
    } catch (error) {
      console.error('Error creating layout:', error);
      // Handle error as needed
    }
  };

  return (
    <div>
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
      <button onClick={handleSaveCategories}>Save</button>
    </div>
  );
};

export default CreateCategories;
