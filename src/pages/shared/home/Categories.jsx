import React from 'react';
import { HiCode, HiDesktopComputer, HiBriefcase, HiUserGroup, HiQuestionMarkCircle } from 'react-icons/hi';
import CustomLink from '../../../components/shared/buttons/linkButton';

const categories = [
    { name: 'Mern Stack Development', icon: <HiCode /> },
    { name: 'Java FSD training', icon: <HiDesktopComputer /> },
    { name: 'Business and Marketing', icon: <HiBriefcase /> },
    { name: 'Career Guidance', icon: <HiUserGroup /> },
    { name: 'Interview Questions', icon: <HiQuestionMarkCircle /> },
];

const ExploreCategories = () => {
    return (
        <div className="bg-slate-200 p-4 sm:p-6 rounded-2xl w-full sm:w-[87%] md:w-[83%] mx-auto">
            <h2 className="font-extrabold text-black text-2xl sm:text-3xl md:text-4xl my-4 sm:my-6 text-center">Explore Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {categories.map((category, index) => (
                    <button key={index} className="bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center h-full">
                        <span className="text-blue-500 text-xl sm:text-2xl mb-2">{category.icon}</span>
                        <span className="text-black text-xs sm:text-sm text-center whitespace-pre-wrap max-w-[60%]">{category.name}</span>
                    </button>
                ))}
            </div>
            <div className="py-6 sm:py-10">
                <CustomLink to="/dashboard">
                    Explore More Categories
                </CustomLink>
            </div>
        </div>
    );
};

export default ExploreCategories;