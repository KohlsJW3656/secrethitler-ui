import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import AdminComponent from "../components/AdminComponent";
import Container from "react-bootstrap/Container";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

function Admin({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="admin" />
      <Container>
        <AdminComponent history={history} />
        <FooterComponent />
      </Container>
    </>
  );
}

export default withRouter(Admin);
