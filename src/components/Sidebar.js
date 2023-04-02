import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Badge, Col, Row } from "react-bootstrap";
import SendMail from "./SendMail";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const email = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.allMails);
  const filteredEmail = mails.filter((mail) => mail.to === email);
  const unread = filteredEmail.filter((mail) => mail.read === false);
  console.log(unread.length);
  console.log(filteredEmail);
  console.log(filteredEmail.length);
  return (
    <div
      style={{
        display: "flex",
        flex: 5,
        height: "100vh",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#212529">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            techDot
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Inbox" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">
                Inbox
                {<Badge className="m-4" bg="secondary">{unread.length}</Badge>}
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Compose</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Sent</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Draft</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px",
            }}
          >
            Welcome to techDot
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
