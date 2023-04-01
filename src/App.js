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


function App() {
  return (
    <RootLayout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signUp">
          <Register />
        </Route>
        <Route path="/inbox">
          <Inbox />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </RootLayout>
  );
}

export default App;
