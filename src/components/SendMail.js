import { useMemo, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import classes from "./SendMail.css";
import { useSelector } from "react-redux";

//user must be able to check
//sent Email ---
//received Email ---

const SendMail = () => {
  const email = useSelector((state) => state.email);
  const [inputValues, setInputValues] = useState({
    email: "",
    testMail: "",
    body: "",
  });
  const [content, setContent] = useState();
  const editor = useRef(null);

  const inputValuesHandler = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  const mailSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: email,
            to: inputValues.email,
            title: inputValues.testMail,
            body: inputValues.body,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch {}
  };

  return (
    <div
      className="p-1"
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Col md={7} lg={6} xl={6}>
        <Form className="p-3 border ">
          <Form.Group className="mb-3">
            <Form.Control
              onChange={inputValuesHandler}
              type="email"
              name="email"
              value={inputValues.email}
              placeholder="To"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="testMail"
              onChange={inputValuesHandler}
              value={inputValues.testMail}
              placeholder="Test Mail"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <JoditEditor
              ref={editor}
              value={inputValues.body}
              tabIndex={300} // tabIndex of textarea
              onChange={(newContent) =>
                setInputValues({ ...inputValues, body: newContent })
              }
              className="sendMail"
            />
          </Form.Group>
          <Button onClick={mailSubmitHandler}>Send</Button>
        </Form>
      </Col>
    </div>
  );
};

export default SendMail;
