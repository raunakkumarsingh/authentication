import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Data from "./Data/Data";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/data" element={<Data />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
