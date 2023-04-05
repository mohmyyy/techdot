import React, { useCallback, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useFetch from "../customHook/useFetch";

const MailDetails = () => {
  const { isLoading, error, sendRequest: updateData } = useFetch();
  // const { sendRequest: fetcData } = useFetch();

  const params = useParams();
  let sent = false;
  let id;
  if (params.sentId === undefined) {
    sent = true;
    id = params.inboxId;
  } else {
    id = params.sentId;
  }
  console.log(id);
  const mails = useSelector((state) => state.mail.allMails);
  console.log(mails);
  const mail = mails.find((mail) => mail.key === id);
  console.log(mail);

  // const getData = (data) => {
  //   console.log(data);
  // // };
  // useEffect(() => {
  //   const getata = (data) => {
  //     console.log(data);
  //   };
  //   fetcData(
  //     {
  //       URL: `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${params.inboxId}.json`,
  //     },
  //     getData
  //   );
  // });

  useEffect(() => {
    updateData({
      URL: `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${params.inboxId}.json`,
      method: "PUT",
      body: {
        from: mail.from,
        to: mail.to,
        title: mail.title,
        body: mail.body,
        time: mail.time,
        read: true,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <div>
      <Card style={{ height: "80vh" }}>
        <Card.Header>
          <h2>{mail.title}</h2>
        </Card.Header>
        <Card.Header>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <AccountCircleOutlinedIcon style={{ fontSize: "40px" }} />
            {sent && (
              <div>
                <h5>{mail.from}</h5>
                <h6>{mail.to}</h6>
              </div>
            )}
            {!sent && (
              <div>
                <h5>{mail.to}</h5>
                <h6>{mail.from}</h6>
              </div>
            )}
          </div>
        </Card.Header>
        <Card.Body className="mw-100 py-4">{mail.body}</Card.Body>
      </Card>
    </div>
  );
};

export default MailDetails;
