// CartDisplay.js
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const CartDisplay = ({ cartLength, cartGeneralLength, user }) => {
    return (
        <div className="flex items-center">
            <Link
                to={user && !user?.employeeId ? '/cartgeneral' : '/cart'}
                type="button"
                className="p-2 rounded-full text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:text-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
            >
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <span className="bg-red-600 border-red-800 h-6 w-6 ml-[-5px] font-semibold text-white rounded-full">
                {user && !user?.employeeId ? cartGeneralLength : cartLength}
            </span>
        </div>
    );
};

export default CartDisplay;
