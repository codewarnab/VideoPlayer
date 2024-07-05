import React, { useEffect } from 'react'

import { Outlet, useNavigate } from "react-router-dom";

const ProtectedEnroll = () => {
    const navigate = useNavigate();

    const pageReload = () => {
        if (!localStorage.getItem("token")) {
            navigate("/signin");
        }
    };
    useEffect(() => {
        pageReload();
        //eslint-disable-next-line
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
}

export default ProtectedEnroll
