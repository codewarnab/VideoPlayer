import React, { useState, useContext} from 'react';
import CreateCategory from './CreateCategory';
import { CategoryContext } from '../../../../utils/contexts/categoryContext';

const CreateCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const { categories, categoryLoading } = useContext(CategoryContext);
  

  const getCategoryOptions = () => categories.map(cat => ({ value: cat._id, label: cat.categoryName }));

  const getSubCategoryOptions = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.subcategories.map(subcat => ({
      value: subcat._id,
      label: subcat.name
    })) : [];
  };

  const categoryTypes = [
    { name: 'Category', parentCategories: [] },
    { name: 'SubCategory', parentCategories: getCategoryOptions() },
    { name: 'SubSubCategory', parentCategories: getCategoryOptions() },
  ];

  const openModal = (category) => {
    setShowModal(true);
    setActiveCategory(category);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveCategory(null);
  };

  return (
    <div className="p-5 w-full relative min-h-[20rem] flex flex-col justify-evenly">
      <h1 className="text-black text-center mb-8 lg:mb-12 text-2xl lg:text-3xl font-extrabold">
        Manage All Categories, Subcategories & Sub-subcategories
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-evenly space-y-4 lg:space-y-0 lg:space-x-4">
        {categoryTypes.map((category, index) => (
          <div key={index} className="w-full lg:w-auto">
            <button
              className="w-full lg:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded inline-flex items-center justify-center transition duration-300"
              onClick={() => openModal(category)}
              disabled={categoryLoading || (category.name !== 'Category' && categories.length === 0)}
            >
              {`Create ${category.name}`}
            </button>
          </div>
        ))}
      </div>

      {showModal && activeCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <CreateCategory
            onClose={closeModal}
            categoryType={activeCategory.name}
            parentCategories={activeCategory.parentCategories}
            categories={categories}
            getSubCategoryOptions={getSubCategoryOptions}
          />
        </div>
      )}
    </div>
  );
}

export default CreateCategories;