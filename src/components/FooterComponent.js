import React from "react";
import { Container } from "react-bootstrap";

function FooterComponent(props) {
  return (
    <Container className="footer">
      <p>
        This is an online version of
        <a href="//secrethitler.com/" target="_blank">
          <u>Secret Hitler</u>
        </a>
        by GOAT, WOLF, & CABBAGE LLC, marked with
        <a href="//creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
          <u>CC BY–NC–SA 4.0</u>
        </a>
      </p>
    </Container>
  );
}
export default FooterComponent;
