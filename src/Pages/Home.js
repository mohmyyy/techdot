import { Col, Container, Row } from "react-bootstrap";
import SendMail from "../components/SendMail";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={8} className="mt-5">
            <SendMail />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
