import "../styles/dashboard.css";
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import DashboardComponent from "../components/DashboardComponent";

function Dashboard({ history }) {
  const authenticated = useSelector((state) => state.authenticated);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="dashboard" />
      <DashboardComponent history={history} />
    </>
  );
}

export default withRouter(Dashboard);
