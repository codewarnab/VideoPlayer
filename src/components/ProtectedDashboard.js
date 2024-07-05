import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedDashboard = () => {
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
};

export default ProtectedDashboard;
