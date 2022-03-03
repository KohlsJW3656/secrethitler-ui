import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import AccountComponent from "../components/AccountComponent";

import { useSelector } from "react-redux";

import { withRouter } from "react-router-dom";

function Account({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="account" />
      <AccountComponent />
    </>
  );
}

export default withRouter(Account);
