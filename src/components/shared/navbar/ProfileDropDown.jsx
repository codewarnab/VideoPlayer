import React from 'react';


const ProfileDropDown = ({ user, isOpen, toggleAvatar, handlelogout, handleAdmin, handleUser }) => {
    const getInitials = (name) => {
        if (!name) return '';
        const nameArray = name.split(' ');
        return nameArray.map(part => part[0].toUpperCase()).join('');
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={toggleAvatar}>
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span className="text-xl">
                            {(user?.name && getInitials(user?.name)) || (user?.firstName && `${user?.firstName[0]}${user?.lastName[0]}`)}
                        </span>
                    </div>
                </div>
            </div>
            {isOpen && (
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li><a href="/#" className="flex justify-between">Name<span className="badge">{user?.name || `${user?.firstName} ${user?.lastName}`}</span></a></li>
                    <li><a href="/#" className="flex justify-between">Role<span className="badge">{user?.role}</span></a></li>
                    <li>{user?.role === 'admin' ? (
                        <div className="text-gray-600 dark:text-gray-500 hover:text-xl cursor-pointer duration-300" onClick={handleAdmin}>Admin Dashboard</div>
                    ) : (
                        <div className="text-gray-600 dark:text-gray-500 hover:text-xl cursor-pointer duration-300" onClick={handleUser}>User Dashboard</div>
                    )}</li>
                    <li><div className="text-blue-600 dark:text-blue-500 hover:text-xl cursor-pointer duration-300" onClick={handlelogout}>Logout</div></li>
                </ul>
            )}
        </div>
    );
};

export default ProfileDropDown;
