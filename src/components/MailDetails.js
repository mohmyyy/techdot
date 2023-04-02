import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MailDetails = () => {
  const params = useParams();
  console.log(params.inboxId);
  const mails = useSelector((state) => state.mail.allMails);
  console.log(mails);
  const mail = mails.find((mail) => mail.key === params.inboxId);
  console.log(mail);
  // const mail = `${
  //   mails ? mails.find((mail) => mail.key === params.inboxId) : {}
  // }`;

  useEffect(() => {
    const putFunction = async () => {
      const response = await fetch(
        `https://techdot-messenger-default-rtdb.firebaseio.com/mails/${params.inboxId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            from: mail.from,
            to: mail.to,
            title: mail.title,
            body: mail.body,
            time: mail.time,
            read: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    };
    try {
      putFunction();
    } catch {}
  });

  return (
    <div>
      <Card>
        <Card.Header>To : {mail.from}</Card.Header>
        <Card.Body>
          <h2>{mail.title}</h2>
          {mail.body}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MailDetails;
