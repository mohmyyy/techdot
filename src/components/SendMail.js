import { useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../redux/redux-mails";
import useFetch from "../customHook/useFetch";

//user must be able to check
//sent Email ---
//received Email ---

const SendMail = () => {
  const email = useSelector((state) => state.auth.email);
  const { isLoading, error, sendRequest: updateData } = useFetch();
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
    // const postingData = (data) => {
    //   console.log(data);
    // };

    event.preventDefault();
    updateData(
      {
        URL: `https://techdot-messenger-default-rtdb.firebaseio.com/mails.json`,
        method: "POST",
        body: {
          ...inputValues,
          from: email,
          time: `${time.getHours()}/${time.getMinutes()}/${time.getSeconds()}`,
          read: false,
        },
        headers: {
          "content-type": "application/json",
        },
      },
    );
    // try {
    //   const response = await fetch(
    //     `https://techdot-messenger-default-rtdb.firebaseio.com/mails.json`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         ...inputValues,
    //         from: email,
    //         time: `${time.getHours()}/${time.getMinutes()}/${time.getSeconds()}`,
    //         read: false,
    //       }),
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await response.json();
    //   console.log(data);
    // } catch {}
    setInputValues({ to: "", title: "", body: "" });
  };

  return (
    <Card className="m-5">
      <Form className="p-3 border">
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
