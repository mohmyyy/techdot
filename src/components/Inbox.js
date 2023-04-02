import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import Mails from "./Mails";
import { getData } from "../redux/redux-mails";

const Inbox = () => {
  // const [fetchData, setFetchData] = useState([]);
  const email = useSelector((state) => state.auth.email);
  // const [read, unread] = useState(<MarkEmailUnreadOutlinedIcon />);
  // const dispatch = useDispatch();

  const mails = useSelector((state) => state.mail.allMails);
  console.log(mails);
  const filteredMails = mails.filter((mail) => mail.to === email);
  console.log(filteredMails);

  return <Mails data={filteredMails} />;
};

export default Inbox;
