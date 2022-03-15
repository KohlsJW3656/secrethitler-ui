import React from "react";
import "../styles/secretid.css";

function SecretIdComponent(props) {
  const roleId = props.roleId;
  const alt = props.alt;
  return (
    <div className="secretIdentity">
      <img src={"../images/players/" + roleId + ".png"} alt={alt} />
      <p>{props.username}</p>
    </div>
  );
}
export default SecretIdComponent;
