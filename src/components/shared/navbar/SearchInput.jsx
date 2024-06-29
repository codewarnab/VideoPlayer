// SearchInput.js
import React from "react";
import { SearchIcon } from '@heroicons/react/outline';

const SearchInput = ({ isSearchExpanded, toggleSearchInputVisibility, handleSearch, place, searchTerm, setSearchTerm }) => {
    return (
        <div className="flex space-x-4 items-center">
            {!isSearchExpanded && (
                <button className="p-2 absolute text-gray-400 hover:text-black focus:outline-none left-12 lg:left-auto lg:static lg:p-0" onClick={toggleSearchInputVisibility}>
                    <SearchIcon className="h-5" />
                </button>
            )}

            {isSearchExpanded && (
                <form
                    onSubmit={handleSearch}
                    className="nav-search-container relative h-9 w-76  flex items-center rounded-full bg-slate-300 p-1 text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 "
                    style={{ maxWidth: isSearchExpanded ? '100%' : '0', overflow: 'hidden' }}
                >
                    <SearchIcon className="h-5 mx-2 " />
                    <input
                        type="text"
                        placeholder={place}
                        className="bg-transparent text-gray-800 text-sm outline-none flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            )}
        </div>
    );
};

export default SearchInput;
