import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { Col, Row } from "react-bootstrap";

const RootLayout = (props) => {
  return (
    <div>
      <NavBar />
      <Row className="bg-dark">
        <Col className="bg-dark" sm={2} md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col className="bg-dark m-0" sm={9} md={8} lg={10}>
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

export default RootLayout;
