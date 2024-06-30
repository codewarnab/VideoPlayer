import React, { useEffect, useState } from 'react';

const MultiFilter = ({ AllCourses, settempCourses, setSearchTerm, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setSearchTerm('');

    // Filter courses based on selected categories
    if (selectedCategories.length > 0) {
      const filteredCourses = AllCourses.filter(course => selectedCategories.includes(course.category));
      settempCourses(filteredCourses);
    } else {
      // No categories selected, show all courses
      settempCourses(AllCourses);
    }
  }, [selectedCategories, AllCourses, settempCourses, setSearchTerm]);

  // Function to handle category button click
  const handleCategoryClick = (category) => {
    // Toggle selection logic
    if (selectedCategories.includes(category)) {
      // Category is already selected, remove it
      const updatedSelection = selectedCategories.filter(cat => cat !== category);
      setSelectedCategories(updatedSelection);
    } else {
      // Category is not selected, add it
      const updatedSelection = [...selectedCategories, category];
      setSelectedCategories(updatedSelection);
    }
  };

  return (
    <div className="flex overflow-x-auto space-x-2 mb-4 whitespace-pre-wrap"  style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-2 py-1 lg:px-3 text-sm rounded-lg focus:outline-none  
            ${selectedCategories.includes(category)
              ? 'bg-blue-400 text-white hover:bg-blue-300 font-bold'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-700'
            }`}
          style={{ minWidth: '80px' }} // Set a minimum width to prevent very narrow buttons
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default MultiFilter;
