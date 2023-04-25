import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useFetch from "../customHook/useFetch";
import { mailAction } from "../redux/redux-mails";

const MailDetails = () => {
  const { isLoading, error, sendRequest: updateData } = useFetch();
  // const { sendRequest: fetchData } = useFetch();

  const emailDetails = useSelector((state) => state.mail.mailDetails);
  console.log(emailDetails);
  const dispatch = useDispatch();
  const params = useParams();
  let sent = false;
  // let id;

  // if (params.sentId === undefined) {
  //   sent = true;
  //   id = params.inboxId;
  // } else {
  //   id = params.sentId;
  // }

  useEffect(() => {
    if (emailDetails) {
      localStorage.setItem("details", JSON.stringify(emailDetails));
    } else {
      const emailDetails = localStorage.getItem("details");
      dispatch(mailAction.mail(JSON.parse(emailDetails)));
      console.log(emailDetails);
    }
  }, [dispatch, emailDetails]);

  return (
    <div>
      <Card style={{ height: "80vh" }}>
        <Card.Header>
          {emailDetails && <h2>{emailDetails.title}</h2>}
        </Card.Header>
        {emailDetails && (
          <Card.Header>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <AccountCircleOutlinedIcon style={{ fontSize: "40px" }} />
              {sent && (
                <div>
                  <h5>{emailDetails.from}</h5>
                  <h6>{emailDetails.to}</h6>
                </div>
              )}
              {!sent && (
                <div>
                  <h5>{emailDetails.to}</h5>
                  <h6>{emailDetails.from}</h6>
                </div>
              )}
            </div>
          </Card.Header>
        )}
        {emailDetails && (
          <Card.Body className="mw-100 py-4"> {emailDetails.body}</Card.Body>
        )}
      </Card>
    </div>
  );
};
export default MailDetails;
