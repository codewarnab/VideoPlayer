import React from 'react';
import Select from 'react-select';

const PageTwo = ({ errors, formData, handleChange, handleSelectChange, categories, isLoading,setCurrentPage }) => {
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

        const timeUnitOptions = [
                { value: 'hours', label: 'Hours' },
                { value: 'days', label: 'Days' },
                { value: 'weeks', label: 'Weeks' },
                { value: 'months', label: 'Months' }
        ];
        const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];
        const languages = ["English", "Bengali", "Hindi", "Other"];
        const customStyles = {
                container: (provided) => ({
                        ...provided,
                        width: '100%',
                }),
                control: (provided) => ({
                        ...provided,
                        minHeight: '30px',
                        height: '30px',
                }),
                valueContainer: (provided) => ({
                        ...provided,
                        height: '30px',
                        padding: '0 6px',
                }),
                input: (provided) => ({
                        ...provided,
                        margin: '0px',
                }),
                indicatorsContainer: (provided) => ({
                        ...provided,
                        height: '30px',
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

        return (
                <>
                <div className='w-full flex flex-col justify-center items-center gap-5 lg:flex-row min-h-[20rem]'>
                        <div className='border  w-full lg:w-1/2 h-full bg-white p-7 rounded-xl text-start mb-4 lg:mb-0'>
                                <div className="flex flex-col ">
                                        <div className='items-start mb-6'>
                                                <label htmlFor='requirements' className="block text-lg font-medium text-black mb-2">5. Requirements</label>
                                                <textarea
                                                        id='requirements'
                                                        name='requirements'
                                                        placeholder='Enter any requirements (e.g., laptop, or any paid/unpaid software) (comma separated)'
                                                        rows='3'
                                                        value={formData.requirements}
                                                        onChange={handleChange}
                                                        className={`p-2 border ${errors.requirements ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                ></textarea>
                                                {errors.requirements && <p className="text-red-500 text-sm mt-1 absolute">{errors.requirements}</p>}
                                        </div>
                                       
                                        <div className='items-start '>
                                                <label htmlFor='prerequisites' className="block text-lg font-medium text-black mb-2">7. Prerequisites</label>
                                                <textarea
                                                        id='prerequisites'
                                                        name='prerequisites'
                                                        placeholder="Enter any prerequisites for this course. (add ' \n ' for line break)"
                                                        rows='3'
                                                        value={formData.prerequisites}
                                                        onChange={handleChange}
                                                        className={`p-2 border ${errors.prerequisites ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                ></textarea>
                                                {errors.prerequisites && <p className="text-red-500 text-sm  absolute">{errors.prerequisites}</p>}
                                        </div>
                                </div>
                        </div>
                          {/* right side*/}
                        <div className='border w-full lg:w-1/2 h-full bg-white p-5 pl-6 py-8 rounded-xl text-start'>
                                <div className="flex flex-col gap-12">
                                        <div className='flex flex-col lg:flex-row justify-between gap-2'>
                                                <div className='w-full lg:w-1/3 mb-4 lg:mb-0'>
                                                        <label className="block text-sm font-medium text-black mb-1">6. Category</label>
                                                        <Select
                                                                options={categoryOptions}
                                                                value={formData.category}
                                                                onChange={(selectedOption) => handleSelectChange('category', selectedOption)}
                                                                placeholder="Select Category"
                                                                isLoading={isLoading}
                                                                styles={customStyles}
                                                        />
                                                        {errors.category && <p className="text-red-500 text-sm mt-1 absolute">{errors.category}</p>}
                                                </div>
                                                <div className='w-full lg:w-1/3 mb-4 lg:mb-0'>
                                                        <label className="block text-sm font-medium text-black mb-1">Subcategory</label>
                                                        <Select
                                                                options={subcategoryOptions}
                                                                value={formData.subCategory}
                                                                onChange={(selectedOption) => handleSelectChange('subCategory', selectedOption)}
                                                                placeholder="Select Subcategory"
                                                                isDisabled={!formData.category}
                                                                styles={customStyles}
                                                        />
                                                </div>
                                                <div className='w-full lg:w-1/3'>
                                                        <label className="block text-sm font-medium text-black mb-1">Sub-subcategory</label>
                                                        <Select
                                                                options={subSubcategoryOptions}
                                                                value={formData.subSubCategory}
                                                                onChange={(selectedOption) => handleSelectChange('subSubCategory', selectedOption)}
                                                                placeholder="Select Sub-subcategory"
                                                                isDisabled={!formData.subCategory}
                                                                styles={customStyles}
                                                        />
                                                </div>
                                        </div>
                                        <div className='flex flex-col lg:flex-row justify-between gap-6'>
                                                <div className='w-full lg:w-[70%] mb-4 lg:mb-0'>
                                                        <label htmlFor='difficultyLevel' className="block text-md font-medium text-black mb-1">8. Difficulty Level</label>
                                                        <select
                                                                id='difficultyLevel'
                                                                name='difficultyLevel'
                                                                value={formData.difficultyLevel}
                                                                onChange={handleChange}
                                                                className={`p-2 border ${errors.difficultyLevel ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                        >
                                                                <option value="">Select Difficulty</option>
                                                                {difficultyLevels.map(level => (
                                                                        <option key={level} value={level}>{level}</option>
                                                                ))}
                                                        </select>
                                                        {errors.difficultyLevel && <p className="text-red-500 text-sm mt-1 absolute">{errors.difficultyLevel}</p>}
                                                </div>
                                                <div className='w-full lg:w-[70%]'>
                                                        <label htmlFor='language' className="block text-md font-medium text-black mb-1">9. Language</label>
                                                        <select
                                                                id='language'
                                                                name='language'
                                                                value={formData.language}
                                                                onChange={handleChange}
                                                                className={`p-2 border ${errors.language ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                        >
                                                                <option value="">Select Language</option>
                                                                {languages.map(lang => (
                                                                        <option key={lang} value={lang}>{lang}</option>
                                                                ))}
                                                        </select>
                                                        {errors.language && <p className="text-red-500 text-sm mt-1 absolute">{errors.language}</p>}
                                                </div>
                                        </div>
                                        <div className='flex flex-col justify-between items-center lg:flex-row gap-6 w-full'>
                                                <div className='w-full lg:w-[70%]'>
                                                        <label htmlFor='expectedtimeFinish' className="block text-md font-medium text-black mb-1">11. Expected Time to Finish</label>
                                                        <div className="flex gap-2">
                                                                <input
                                                                        type="number"
                                                                        id='expectedtimeFinishNumber'
                                                                        name='expectedtimeFinishNumber'
                                                                        placeholder='Enter number'
                                                                        value={formData.expectedtimeFinishNumber}
                                                                        onChange={handleChange}
                                                                        className={`p-1 border ${errors.expectedtimeFinishNumber ? 'border-red-400' : 'border-gray-300'} rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                                />
                                                                <Select
                                                                        options={timeUnitOptions}
                                                                        value={formData.expectedtimeFinishUnit}
                                                                        onChange={(selectedOption) => handleSelectChange('expectedtimeFinishUnit', selectedOption)}
                                                                        placeholder="Select Unit"
                                                                        styles={customStyles}
                                                                        className="w-full"
                                                                />
                                                        </div>
                                                        {errors.expectedtimeFinishNumber && <p className="text-red-500 text-sm mt-1 absolute">{errors.expectedtimeFinishNumber}</p>}
                                                </div>
                                                <div className='w-full lg:w-[70%]'>
                                                        <label htmlFor='contactNumber' className="block text-md font-medium text-black mb-1">12. Enter contact number </label>
                                                        <input
                                                                type="text"
                                                                id='contactNumber'
                                                                name='contactNumber'
                                                                placeholder='Enter Contact  number'
                                                                value={formData.contactNumber}
                                                                onChange={handleChange}
                                                                className={`p-1 border ${errors.contactNumber ? 'border-red-400' : 'border-gray-300'} rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black lg:w-[85%] w-full`}
                                                        />
                                                        {errors.contactNumber && <p className="text-red-500 text-sm mt-1 absolute">{errors.contactNumber}</p>}
                                                        
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                <div className='flex w-full justify-evenly mt-6'>
                        <div className='flex w-full justify-evenly'>
                            <button
                                type="button"
                                className="lg:w-[20%] w-[40%] text-xl font-bold bg-blue-700 text-white py-2 mt-6 rounded-md hover:bg-blue-800 transition duration-300"
                                onClick={() => setCurrentPage(prevState => prevState - 1)}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="lg:w-[20%] w-[40%] text-xl font-bold bg-blue-700 text-white py-2 mt-6 rounded-md hover:bg-blue-800 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                </div>
                </>
        );
};

export default PageTwo;
