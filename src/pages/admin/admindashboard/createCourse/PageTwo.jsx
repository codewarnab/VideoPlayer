import React from 'react';
import Select from "react-select";

const PageTwo = ({ formData = {}, isLoading, errors = {}, handleSelectChange, handleChange, categories = [] }) => {
    const timeUnitOptions = [
        { value: 'hours', label: 'Hours' },
        { value: 'days', label: 'Days' },
        { value: 'weeks', label: 'Weeks' },
        { value: 'months', label: 'Months' }
    ];
    const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
    const languages = [
        { value: 'english', label: 'English' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'bengali', label: 'Bengali' },
        { value: 'other', label: 'Other' }
    ];
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

    const categoryOptions = categories.map(category => ({
        value: category._id,
        label: category.categoryName
    }));

    const subcategoryOptions = formData.category
        ? categories
            .find(cat => cat._id === formData.category.value)
            ?.subcategories.map(subcat => ({
                value: subcat._id,
                label: subcat.name
            })) || []
        : [];

    const subSubcategoryOptions = formData.subCategory
        ? categories
            .find(cat => cat._id === formData.category.value)
            ?.subcategories
            .find(subcat => subcat._id === formData.subCategory.value)
            ?.subSubcategories.map(subSubcat => ({
                value: subSubcat._id,
                label: subSubcat.name
            })) || []
        : [];

    return (
        <div className="w-full px-4 py-6 md:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-8 text-start">
                <div className="w-full lg:w-1/2 space-y-6 mb-6 lg:mb-0">
                    <div>
                        <label htmlFor="numProjectsIncluded" className="block text-sm font-medium text-black mb-1">
                            6. Number of Projects Included
                        </label>
                        <input
                            type='number'
                            id='numProjectsIncluded'
                            name='numProjectsIncluded'
                            placeholder='Enter number of projects'
                            value={formData.numProjectsIncluded || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                        {errors.numProjectsIncluded && <p className="text-red-500 text-xs mt-1 absolute">{errors.numProjectsIncluded}</p>}
                    </div>
                    <div>
                        <label htmlFor='requirements' className="block text-sm font-medium text-black mb-1">
                            7. Requirements
                        </label>
                        <textarea
                            id='requirements'
                            name='requirements'
                            placeholder='Enter requirements (comma separated)'
                            rows='3'
                            value={formData.requirements || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                        ></textarea>
                        {errors.requirements && <p className="text-red-500 text-xs  absolute">{errors.requirements}</p>}
                    </div>
                    <div>
                        <label htmlFor='language' className="block text-sm font-medium text-black mb-1">
                            8. Language
                        </label>
                        <select
                            id='language'
                            name='language'
                            value={formData.language || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                        >
                            <option value="">Select Language</option>
                            {languages.map(lang => (
                                <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </select>
                        {errors.language && <p className="text-red-500 text-xs mt-1 absolute">{errors.language}</p>}
                    </div>
                    <div>
                        <label htmlFor='instructorName' className="block text-sm font-medium text-black mb-1">
                            9. Instructor Name
                        </label>
                        <input
                            type='text'
                            id='instructorName'
                            name='instructorName'
                            placeholder='Enter instructor name'
                            value={formData.instructorName || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                        {errors.instructorName && <p className="text-red-500 text-xs mt-1 absolute">{errors.instructorName}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor='expectedtimeFinishNumber' className="block text-sm font-medium text-black mb-2">
                            10. Expected Time to Finish
                        </label>
                        <div className="flex space-x-4 items-center">
                            <div className="flex-grow">
                                <input
                                    type='number'
                                    id='expectedtimeFinishNumber'
                                    name='expectedtimeFinishNumber'
                                    placeholder='Enter number'
                                    value={formData.expectedtimeFinishNumber || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                                />
                                {errors.expectedtimeFinishNumber && <p className="text-red-500 text-xs mt-1 absolute">{errors.expectedtimeFinishNumber}</p>}
                            </div>
                            <div className="w-1/3">
                                <select
                                    id='expectedtimeFinishUnit'
                                    name='expectedtimeFinishUnit'
                                    value={formData.expectedtimeFinishUnit || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                                >
                                    <option value="">Unit</option>
                                    {timeUnitOptions.map(unit => (
                                        <option key={unit.value} value={unit.value}>{unit.label}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-8">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            {" "}
                            11. Category
                        </label>
                        <Select
                            options={categoryOptions}
                            value={formData.category}
                            onChange={(selectedOption) =>
                                handleSelectChange("category", selectedOption)
                            }
                            placeholder="Select Category"
                            isLoading={isLoading}
                            styles={customStyles}
                        />
                        {errors.category && (
                            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            {" "}
                            12. Subcategory
                        </label>
                        <Select
                            options={subcategoryOptions}
                            value={formData.subCategory}
                            onChange={(selectedOption) =>
                                handleSelectChange("subCategory", selectedOption)
                            }
                            placeholder="Select Subcategory"
                            isDisabled={!formData.category}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            {" "}
                            13. Sub-subcategory
                        </label>
                        <Select
                            options={subSubcategoryOptions}
                            value={formData.subSubCategory}
                            onChange={(selectedOption) =>
                                handleSelectChange("subSubCategory", selectedOption)
                            }
                            placeholder="Select Sub-subcategory"
                            isDisabled={!formData.subCategory}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <label htmlFor='role' className="block text-sm font-medium text-black mb-1">14. User Role</label>
                        <select
                            id='role'
                            name='role'
                            value={formData.role || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                        >
                            <option value="">Select Role</option>
                            <option value="Employee">Employee</option>
                            <option value="Buyer">Buyer</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>
                    <div>
                        <label htmlFor='difficultyLevel' className="block text-sm font-medium text-black mb-1">15. Difficulty Level</label>
                        <select
                            id='difficultyLevel'
                            name='difficultyLevel'
                            value={formData.difficultyLevel || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black"
                        >
                            <option value="">Select Difficulty</option>
                            {difficultyLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        {errors.difficultyLevel && <p className="text-red-500 text-xs mt-1">{errors.difficultyLevel}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTwo;
