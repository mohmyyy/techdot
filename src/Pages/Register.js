import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [match, setMatch] = useState(true);

  const inputchangeHandler = (event) => {
    const inputObj = { ...input, [event.target.name]: event.target.value };
    setInput(inputObj);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (input.password !== input.confirmPassword) {
      return setMatch(false);
    }
    setMatch(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqf51p2j8MCmXzGVzjWDTqPIRvyMr5KUE",
        {
          method: "POST",
          body: JSON.stringify({
            email: input.email,
            password: input.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error('Authentication Failed');
      }
      console.log('Successfully signed up')
    } catch (error) {
      alert(error)
    }
  };
  return (
    <>
      <Container>
        <Row
          className="mt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col xs={10} sm={8} md={6} lg={5} xl={5}>
            <Card className="shadow-lg">
              <Card.Header className="bg-warning p-3 text-center">
                <h4>Register</h4>
              </Card.Header>
              <Card.Body className="bg-light">
                <Form className="text-center" onSubmit={formSubmitHandler}>
                  <Form.Group className="m-2" controlId="formBasicEmail">
                    <Form.FloatingLabel className="form-floating form-floating-sm">
                      <Form.Control
                        className="form-control "
                        type="email"
                        required
                        placeholder="Email here"
                        onChange={inputchangeHandler}
                        value={input.email}
                        name="email"
                      />
                      <Form.Label className="text-left">Email</Form.Label>
                    </Form.FloatingLabel>
                  </Form.Group>
                  <Form.Group className="m-2" controlId="formBasicPassword">
                    <Form.FloatingLabel className="form-floating form-floating-sm">
                      <Form.Control
                        className="form-control "
                        type="password"
                        required
                        placeholder="Password"
                        onChange={inputchangeHandler}
                        value={input.password}
                        name="password"
                      />
                      <Form.Label className="text-left">Password</Form.Label>
                    </Form.FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mx-2" controlId="formBasicConfirmPassword">
                    <Form.FloatingLabel className="form-floating form-floating-sm">
                      <Form.Control
                        className="form-control "
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={input.confirmPassword}
                        onChange={inputchangeHandler}
                        name="confirmPassword"
                      />
                      <Form.Label className="text-left">
                        Confirm Password
                      </Form.Label>
                    </Form.FloatingLabel>
                  </Form.Group>
                  {!match && <p>Password doesn't match</p>}
                  <Button
                    variant="light"
                    type="submit"
                    className="m-2 bg-warning"
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          className="mt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col xs={10} sm={8} md={6} lg={5} xl={5}>
            <Card className="shadow-lg">
              <Card.Body className="text-center">
                Have an Account?{" "}
                <span>
                  <a href="/Login">Login</a>
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
