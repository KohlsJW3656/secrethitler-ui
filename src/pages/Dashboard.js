import React, { useEffect } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import DashboardComponent from "../components/DashboardComponent";

function Dashboard({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="dashboard" />
      <Container>
        <DashboardComponent history={history} />
      </Container>
    </>
  );
}

export default withRouter(Dashboard);
