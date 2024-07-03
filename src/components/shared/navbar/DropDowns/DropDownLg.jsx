import React, { useState, useRef, useEffect } from 'react';

const DropDownLg = ({ loading, categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSubCategory, setActiveSubCategory] = useState(0);
    const dropdownRef = useRef(null);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleCategoryMouseEnter = (index) => {
        setActiveCategory(index);
        setActiveSubCategory(0);
    };

    const handleSubCategoryMouseEnter = (index) => {
        setActiveSubCategory(index);
    };

    return (
        <div
            className="relative hidden lg:block"
            ref={dropdownRef}
            onMouseEnter={() => {
                setIsOpen(prevState => !prevState);
            }}
            onMouseLeave={() => {
                setIsOpen(prevState => !prevState);
            }}
        >
            <div className="p-4 cursor-pointer text-gray-700 hover:text-black">
                Categories
            </div>
            {isOpen && (
                <div className="absolute left-0 mt-0 rounded-md flex min-h-[30rem]  bg-white border border-gray-300 shadow-lg z-10 text-black">
                    <div className="w-64 border-r border-gray-300 flex flex-col justify-center">
                        {loading ? (
                            <h1>Loading ...</h1>
                        ) : (
                            categories && categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => handleCategoryMouseEnter(index)}
                                >
                                    <div
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${activeCategory === index ? 'bg-gray-200 font-bold' : ''}`}
                                    >
                                        {category.categoryName}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="w-64 border-r border-gray-300">
                        {categories && categories[activeCategory] && categories[activeCategory].subcategories.map((subCategory, subIndex) => (
                            <div
                                key={subIndex}
                                className="relative"
                                onMouseEnter={() => handleSubCategoryMouseEnter(subIndex)}
                            >
                                <div
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${activeSubCategory === subIndex ? 'bg-gray-200 font-bold' : ''}`}
                                >
                                    {subCategory.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-64">
                        {categories && categories[activeCategory] && categories[activeCategory].subcategories[activeSubCategory] && categories[activeCategory].subcategories[activeSubCategory].subSubcategories.map((subSubCategory, subSubIndex) => (
                            <div key={subSubIndex} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {subSubCategory.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownLg;
