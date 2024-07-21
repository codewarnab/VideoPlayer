import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Folder } from 'lucide-react';

const Breadcrumbs = ({ courseData }) => {
    return (
        <nav className="text-sm text-black">
            <ol className="flex flex-wrap items-center gap-2">
                <li className="flex items-center">
                    <Link to="/dashboard" className="flex items-center hover:text-blue-500 transition-colors">
                        <Home className="h-4 w-4 stroke-current mr-1" />
                        <span>Home</span>
                    </Link>
                </li>
                {courseData?.category && (
                    <li className="flex items-center">
                        <span className="mx-2 text-gray-500">/</span>
                        <Link to={`/category/${courseData.category}`} className="flex items-center hover:text-blue-500 transition-colors">
                            <Folder className="h-4 w-4 stroke-current mr-1" />
                            <span>{courseData.category}</span>
                        </Link>
                    </li>
                )}
                {courseData?.subCategory && (
                    <li className="flex items-center">
                        <span className="mx-2 text-gray-500">/</span>
                        <Link to={`/subcategory/${courseData.subCategory}`} className="flex items-center hover:text-blue-500 transition-colors">
                            <Folder className="h-4 w-4 stroke-current mr-1" />
                            <span>{courseData.subCategory}</span>
                        </Link>
                    </li>
                )}
                {courseData?.subSubCategory && (
                    <li className="flex items-center">
                        <span className="mx-2 text-gray-500">/</span>
                        <Link to={`/subsubcategory/${courseData.subSubCategory}`} className="flex items-center hover:text-blue-500 transition-colors">
                            <Folder className="h-4 w-4 stroke-current mr-1" />
                            <span>{courseData.subSubCategory}</span>
                        </Link>
                    </li>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;