
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Folder } from 'lucide-react';

const Breadcrumbs = ({ courseData }) => {
    return (
        <div className="breadcrumbs text-sm text-black">
            <ul>
                <li>
                    <Link to="/dashboard">
                        <span className="inline-flex items-center gap-2">
                            <Home className="h-4 w-4 stroke-current" />
                            Home
                        </span>
                    </Link>
                </li>
                {courseData?.category && (
                    <li>
                        <Link to={`/category/${courseData.category}`}>
                            <span className="inline-flex items-center gap-2">
                                <Folder className="h-4 w-4 stroke-current" />
                                {courseData.category}
                            </span>
                        </Link>
                    </li>
                )}
                {courseData?.subCategory && (
                    <li>
                        <Link to={`/subcategory/${courseData.subCategory}`}>
                            <span className="inline-flex items-center gap-2">
                                <Folder className="h-4 w-4 stroke-current" />
                                {courseData.subCategory}
                            </span>
                        </Link>
                    </li>
                )}
                {courseData?.subSubCategory && (
                    <li>
                        <Link to={`/subsubcategory/${courseData.subSubCategory}`}>
                            <span className="inline-flex items-center gap-2">
                                <Folder className="h-4 w-4 stroke-current" />
                                {courseData.subSubCategory}
                            </span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
