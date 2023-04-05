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
import { mailAction } from "./redux/redux-mails";
import { useCallback, useEffect } from "react";
import SentMail from "./components/SentMail";
import useFetch from "./customHook/useFetch";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isToken);

  const { isLoading, error, sendRequest: fetchTasks } = useFetch();

  useEffect(() => {
    const transformData = (data) => {
      const fetchedData = [];
      for (const keys in data) {
        const fetchedObj = {
          key: keys,
          ...data[keys],
        };
        fetchedData.push(fetchedObj);
      }
      dispatch(mailAction.replace(fetchedData));
    };
    const interval = setInterval(() => {
      // dispatch(getData());
      fetchTasks(
        {
          URL: "https://techdot-messenger-default-rtdb.firebaseio.com/mails.json",
        },
        transformData
      );
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchTasks, dispatch]);
  return (
    <>
      {!isLoggedIn && (
        <Route path="/login">
          <Login />
        </Route>
      )}
      {!isLoggedIn && (
        <Route path="/signUp">
          <Register />
        </Route>
      )}
      {isLoggedIn && (
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
            <Route path="/sent/:sentId">
              <MailDetails />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </RootLayout>
      )}
      {!isLoggedIn && <Redirect to="/login" />}
    </>
  );
}

export default App;
