import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { Col, Row } from "react-bootstrap";

const RootLayout = (props) => {
  return (
    <div>
      <NavBar />
      <Row>
        <Col className="bg-dark" sm={2} md={3} lg={3}>
          <Sidebar />
        </Col>
        <Col
          className="bg-dark"
          sm={10}
          md={8}
          lg={9}
        >
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

export default RootLayout;
