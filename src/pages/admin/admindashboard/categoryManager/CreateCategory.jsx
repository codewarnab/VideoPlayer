import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '40px',
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    '&:hover': {
      borderColor: '#3b82f6'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#f3f4f6'
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    backgroundColor: state.isSelected ? '#e0e0e0' : 'white',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

const CreateCategory = ({ onClose, categoryType, parentCategories, categories, getSubCategoryOptions }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    if (categoryType === 'SubSubCategory' && selectedMainCategory) {
      setSubCategoryOptions(getSubCategoryOptions(selectedMainCategory.value));
    }
  }, [categoryType, selectedMainCategory, getSubCategoryOptions]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const data = { categoryName };
      if (categoryType === 'SubCategory') {
        data.parentCategory = selectedParent.value;
      } else if (categoryType === 'SubSubCategory') {
        data.parentCategory = selectedParent.value;
        data.mainCategory = selectedMainCategory.value;
      }
      console.log(data);
      const res = await axios.post(`/category/create${categoryType}`, data);
      setCategoryName('');
      setIsChecked(false);
      setSelectedParent(null);
      setSelectedMainCategory(null);
      onClose();
      toast.success(res.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        console.log(error.request);
        toast.error('No response from server');
      } else {
        console.log('Error', error.message);
        toast.error(`Error creating ${categoryType.toLowerCase()}`);
      }
    }
  }

  return (
    <div className="lg:w-full max-w-md w-[93%] bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Create {categoryType}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        {categoryType === 'SubCategory' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentCategory">
              Parent Category
            </label>
            <Select
              options={parentCategories}
              value={selectedParent}
              onChange={setSelectedParent}
              placeholder="Select Category"
              styles={customStyles}
            />
          </div>
        )}
        {categoryType === 'SubSubCategory' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainCategory">
                Main Category
              </label>
              <Select
                options={parentCategories}
                value={selectedMainCategory}
                onChange={(selected) => {
                  setSelectedMainCategory(selected);
                  setSelectedParent(null);
                }}
                placeholder="Select Main Category"
                styles={customStyles}
              />
            </div>
            {selectedMainCategory && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategory">
                  Sub Category
                </label>
                <Select
                  options={subCategoryOptions}
                  value={selectedParent}
                  onChange={setSelectedParent}
                  placeholder="Select Sub Category"
                  styles={customStyles}
                />
              </div>
            )}
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
            {categoryType} Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={`Enter ${categoryType.toLowerCase()} name`}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-400"
          />
        </div>
        <div className="mb-6 flex items-center justify-center">
          <input
            id="confirmCheckbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="confirmCheckbox" className="ml-2 block text-xs text-gray-700 text-start">
            I confirm that I verified this {categoryType.toLowerCase()} does not already exist.
          </label>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCreateCategory}
          disabled={!categoryName || !isChecked || (categoryType !== 'Category' && !selectedParent) || (categoryType === 'SubSubCategory' && !selectedMainCategory)}
        >
          Create {categoryType}
        </button>
      </div>
    </div>
  );
}

export default CreateCategory;