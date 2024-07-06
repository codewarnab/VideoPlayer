import React from 'react';
import Select from 'react-select';

const PageTwo = ({ errors, formData, handleChange, handleSelectChange, categories, isLoading }) => {
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
                <div className='w-full flex min-h-[20rem]'>
                        <div className='border w-1/2 h-full bg-white p-5 rounded-xl text-start'>
                                <div className="flex flex-col gap-4">
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
                                                {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
                                        </div>
                                        <div className='flex justify-between gap-2'>
                                                <div className='w-1/3'>
                                                        <label className="block text-sm font-medium text-black mb-1">6. Category</label>
                                                        <Select
                                                                options={categoryOptions}
                                                                value={formData.category}
                                                                onChange={(selectedOption) => handleSelectChange('category', selectedOption)}
                                                                placeholder="Select Category"
                                                                isLoading={isLoading}
                                                                styles={customStyles}
                                                        />
                                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                                </div>
                                                <div className='w-1/3'>
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
                                                <div className='w-1/3'>
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
                                </div>
                        </div>
                        <div className='border w-1/2 h-full bg-white p-5 rounded-xl text-start'>
                                <div className="flex flex-col gap-4">
                                        <div className='items-start mb-6'>
                                                <label htmlFor='prerequisites' className="block text-lg font-medium text-black mb-2">7. Prerequisites</label>
                                                <textarea
                                                        id='prerequisites'
                                                        name='prerequisites'
                                                        placeholder='Enter any prerequisites for this course'
                                                        rows='3'
                                                        value={formData.prerequisites}
                                                        onChange={handleChange}
                                                        className={`p-2 border ${errors.prerequisites ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                ></textarea>
                                                {errors.prerequisites && <p className="text-red-500 text-sm mt-1">{errors.prerequisites}</p>}
                                        </div>
                                        <div className='flex justify-between gap-2'>
                                                <div className='w-1/2'>
                                                        <label htmlFor='difficultyLevel' className="block text-sm font-medium text-black mb-1">8. Difficulty Level</label>
                                                        <select
                                                                id='difficultyLevel'
                                                                name='difficultyLevel'
                                                                value={formData.difficultyLevel}
                                                                onChange={handleChange}
                                                                className={`p-2 border ${errors.difficultyLevel ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                        >
                                                                <option value="">Select Difficulty</option>
                                                                <option value="Beginner">Beginner</option>
                                                                <option value="Intermediate">Intermediate</option>
                                                                <option value="Advanced">Advanced</option>
                                                        </select>
                                                        {errors.difficultyLevel && <p className="text-red-500 text-sm mt-1">{errors.difficultyLevel}</p>}
                                                </div>
                                                <div className='w-1/2'>
                                                        <label htmlFor='language' className="block text-sm font-medium text-black mb-1">9. Language</label>
                                                        <select
                                                                id='language'
                                                                name='language'
                                                                value={formData.language}
                                                                onChange={handleChange}
                                                                className={`p-2 border ${errors.language ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                        >
                                                                <option value="">Select Language</option>
                                                                <option value="English">English</option>
                                                                <option value="Spanish">Spanish</option>
                                                                <option value="French">French</option>
                                                                {/* Add more language options as needed */}
                                                        </select>
                                                        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
                                                </div>
                                        </div>
                                        <div className='items-start mb-6'>
                                                <label htmlFor='tags' className="block text-lg font-medium text-black mb-2">10. Tags</label>
                                                <input
                                                        type="text"
                                                        id='tags'
                                                        name='tags'
                                                        placeholder='Enter tags (comma separated)'
                                                        value={formData.tags}
                                                        onChange={handleChange}
                                                        className={`p-2 border ${errors.tags ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                />
                                                {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                                        </div>
                                        <div className='items-start mb-6'>
                                                <label htmlFor='expectedtimeFinish' className="block text-lg font-medium text-black mb-2">11. Expected Time to Finish</label>
                                                <input
                                                        type="text"
                                                        id='expectedtimeFinish'
                                                        name='expectedtimeFinish'
                                                        placeholder='Enter expected time to finish (e.g., 2 weeks, 1 month)'
                                                        value={formData.expectedtimeFinish}
                                                        onChange={handleChange}
                                                        className={`p-2 border ${errors.expectedtimeFinish ? 'border-red-400' : 'border-gray-300'} rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full`}
                                                />
                                                {errors.expectedtimeFinish && <p className="text-red-500 text-sm mt-1">{errors.expectedtimeFinish}</p>}
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default PageTwo;