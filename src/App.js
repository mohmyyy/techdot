import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {
  BrowserRouter as Routes,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import Inbox from "./components/Inbox";
import MailDetails from "./components/MailDetails";
import { useDispatch, useSelector } from "react-redux";
import { getData, putData } from "./redux/redux-mails";
import { useEffect } from "react";
import SentMail from "./components/SentMail";

function App() {
  const dispatch = useDispatch();
  // const mails = useSelector((state) => state.mail.allMails);

  useEffect(() => {
    dispatch(getData());

    const interval = setInterval(() => {
      console.log();
      dispatch(getData());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return (
    <>
      {false && (
        <Route path="/login">
          <Login />
        </Route>
      )}
      {/* <Route path="/signUp">
        <Register />
      </Route> */}
      {true && (
        <RootLayout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/inbox" exact>
              <Inbox />
            </Route>
            <Route path="/inbox/:inboxId">
              <MailDetails />
            </Route>
            <Route path="/sent" exact>
              <SentMail />
            </Route>
            <Route path="/sent/:sendId">
              <MailDetails />
            </Route>
            <Route path="/drafts">
              <h1>nothing in Draft</h1>
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </RootLayout>
      )}
    </>
  );
}

export default App;
