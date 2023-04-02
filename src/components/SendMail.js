import { useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../redux/redux-mails";

//user must be able to check
//sent Email ---
//received Email ---

const SendMail = () => {
  const email = useSelector((state) => state.auth.email);
  console.log(email);
  const [inputValues, setInputValues] = useState({
    to: "",
    title: "",
    body: "",
  });
  const [content, setContent] = useState();
  const editor = useRef(null);
  const dispatch = useDispatch();

  const time = new Date();

  const inputValuesHandler = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  const mailSubmitHandler = async (event) => {
    event.preventDefault();
    // dispatch(
    //   mailAction.addToMails({
    //     ...inputValues,
    //   })
    // );
    try {
      const response = await fetch(
        `https://techdot-messenger-default-rtdb.firebaseio.com/mails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...inputValues,
            from: email,
            // to: inputValues.to,
            // title: inputValues.title,
            // body: inputValues.body,
            time: `${time.getHours()}/${time.getMinutes()}/${time.getTimezoneOffset()}`,
            read: false,
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
    <Card>
      <Form className="p-3 border ">
        <Form.Group className="mb-3">
          <Form.Control
            onChange={inputValuesHandler}
            type="email"
            name="to"
            value={inputValues.to}
            placeholder="To"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="title"
            onChange={inputValuesHandler}
            value={inputValues.title}
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
    </Card>
  );
};

export default SendMail;
