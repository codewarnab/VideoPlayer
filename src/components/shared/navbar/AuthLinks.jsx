// AuthLinks.js
import React from 'react';
import { Link} from 'react-router-dom';

const AuthLinks = ({ isActive, isSearchExpanded ,location}) => {

    return (
        <div className={`flex space-x-4 ${isSearchExpanded && 'hidden sm:flex'}` }>
            <Link to="/signin" className={`px-3 py-2  text-base font-bold border border-blue-600  rounded hover:text-blue-500  text-blue-950   ${isActive === 'signin' ? 'bg-slate-100' : ''}`}>
                Sign In
            </Link>
            <Link to="/signup" className="px-3   py-2 text-base font-bold bg-blue-600  text-white  rounded hover:bg-blue-500  "
                onClick={()=>{
                    if(location==='/signup'){
                        window.location.reload();
                    }
                }}
            >
                Sign Up
            </Link>
        </div>
    );
};

export default AuthLinks;
// space - x - 4 