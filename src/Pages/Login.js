import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authAction } from "../redux/redux-store";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const inputchangeHandler = (event) => {
    const inputObj = { ...input, [event.target.name]: event.target.value };
    setInput(inputObj);
  };

  const history = useHistory();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXQEK7j4wRDw7vUHNh5EKlcUcq2NKWe3g",
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
        throw new Error("Authentication Failed");
      }
      const data = await response.json();
      console.log(data.email);
      history.replace("/");
      dispatch(authAction.login({ idToken: data.idToken, email: data.email }));
    } catch (error) {
      alert(error);
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
                <h4>Log In</h4>
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
                  <Button
                    variant="light"
                    type="submit"
                    className="m-2 bg-warning"
                  >
                    Log in
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
                don't have an Account?{" "}
                <span>
                  <Link to="/signup">Register</Link>
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
