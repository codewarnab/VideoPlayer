import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';

const DropDownSm = ({ categories, isCategoryOpen, loading, setCategoryOpen, setIsMobileNavOpen }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const contentRef = useRef(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
    setOpenSubCategory(null);
  };

  const toggleSubcategory = (subcategoryId) => {
    setOpenSubCategory(openSubCategory === subcategoryId ? null : subcategoryId);
  };

  const checkOverflow = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isOverflowing = scrollHeight > clientHeight;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
      setShowScrollIndicator(isOverflowing && !isScrolledToBottom);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [openCategory, openSubCategory]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', checkOverflow);
      return () => contentElement.removeEventListener('scroll', checkOverflow);
    }
  }, []);

  return (
    <div className={`bg-white text-black max-h-[80svh] min-h-[78svh] w-[70%] md:hidden lg:hidden flex flex-col rounded-lg absolute top-0 left-[-10px] p-5 overflow-hidden py-10 z-[100] shadow-md transition-transform transform ${isCategoryOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <h1 className='text-xl mb-4'>Categories</h1>
      <div
        ref={contentRef}
        className="w-full flex-grow overflow-y-auto scrollbar-hide relative"
      >
        {!loading && categories && categories.map(category => (
          <div key={category._id} className="mb-4 w-full">
            <h2 className="font-semibold flex gap-2 w-full items-center justify-between text-sm">
              {category.categoryName}
              <span
                className='text-gray-500 cursor-pointer'
                onClick={() => toggleCategory(category._id)}
              >
                {openCategory === category._id ? <Minus /> : <Plus />}
              </span>
            </h2>
            {openCategory === category._id && category.subcategories && (
              <div className="ml-4 mt-2 flex flex-col items-start">
                {category.subcategories.map(subcategory => (
                  <div key={subcategory._id} className="w-full">
                    <div className="flex justify-between items-center text-sm py-1">
                      <span>{subcategory.name}</span>
                      <span
                        className='text-gray-500 cursor-pointer'
                        onClick={() => toggleSubcategory(subcategory._id)}
                      >
                        {openSubCategory === subcategory._id ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </div>
                    {openSubCategory === subcategory._id && subcategory.subSubcategories && (
                      <div className="ml-4 mt-1 flex flex-col items-start">
                        {subcategory.subSubcategories.map(subSubcategory => (
                          <div key={subSubcategory._id} className="text-sm py-1">
                            {subSubcategory.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {showScrollIndicator && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 bg-gradient-to-t from-white to-transparent">
          <ChevronDown className="text-gray-500 animate-bounce" size={24} />
        </div>
      )}
    </div>
  );
};

export default DropDownSm;
