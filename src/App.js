import { React } from "react";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Home from "./Pages/Home";
// import ErrorPage from "./Pages/ErrorPage";
// import Inbox from "./components/Inbox";
// import MailDetails from "./components/MailDetails";
// import SentMail from "./components/SentMail";
import {
  BrowserRouter as Routes,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "./redux/redux-mails";
import { useEffect } from "react";
import useFetch from "./customHook/useFetch";

import { lazy, Suspense } from "react";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Home = lazy(() => import("./Pages/Home"));
const Inbox = lazy(() => import("./components/Inbox"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const SentMail = lazy(() => import("./components/SentMail"));
const MailDetails = lazy(() => import("./components/MailDetails"));

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
      fetchTasks(
        {
          URL: "https://techd0t-default-rtdb.firebaseio.com/mails.json",
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
      <Suspense
        fallback={
          <center className="mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </center>
        }
      >
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
      </Suspense>
    </>
  );
}

export default App;
