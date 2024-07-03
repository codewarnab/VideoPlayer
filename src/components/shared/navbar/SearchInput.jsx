import React from "react";
import { SearchIcon } from '@heroicons/react/outline';

const SearchInput = ({ isSearchExpanded, toggleSearchInputVisibility, handleSearch, place, searchTerm, setSearchTerm }) => {
    return (
        <div className="flex space-x-4 items-center">
            {!isSearchExpanded && (
                <button className="p-2 absolute text-gray-400 hover:text-black focus:outline-none left-12 lg:left-auto lg:static lg:p-0 lg:hidden" onClick={toggleSearchInputVisibility}>
                    <SearchIcon className="h-5" />
                </button>
            )}

            <form
                onSubmit={handleSearch}
                className={`nav-search-container relative  w-full lg:w-80 flex items-center rounded-full bg-slate-300 p-2 text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300  ${isSearchExpanded ? 'block' : 'hidden lg:block'
                    }`}
            >
                <div className="flex   items-center justify-start ">

                    <SearchIcon className="h-5 mx-2" />
                    <input
                        type="text"
                        placeholder={place}
                        className="bg-transparent text-gray-800 text-sm outline-none "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchInput;
