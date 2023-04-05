import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./SideBar.module.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Badge, Col, Row } from "react-bootstrap";
import SendMail from "./SendMail";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/redux-store";
const Sidebar = () => {
  const email = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.allMails);
  const filteredEmail = mails.filter((mail) => mail.to === email);
  const unread = filteredEmail.filter((mail) => mail.read === false);
  const history = useHistory();
  console.log(unread.length);
  console.log(filteredEmail);
  console.log(filteredEmail.length);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    history.replace("/login");
    dispatch(authAction.Logout());
  };
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.links}>
          <div className={classes.link}>
            <NavLink to="/">
              <div className={classes["link-info"]}>
                <CreateOutlinedIcon />
                <span>Compose</span>
              </div>
            </NavLink>
          </div>
          <div className={classes.link}>
            <NavLink to="/inbox">
              <div className={classes["link-info"]}>
                <InboxOutlinedIcon />
                <span>Inbox</span>
                <Badge bg="secondary">{unread.length}</Badge>
              </div>
            </NavLink>
          </div>
          <div className={classes.link}>
            <NavLink to="/sent">
              <div className={classes["link-info"]}>
                <SendOutlinedIcon />
                <span>Sent</span>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.button}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
