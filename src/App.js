import "./App.scss";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Passwordreset from "./components/Passwordreset";
import HomePage from "./components/HomePage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/register" element={<Registration />} />
          <Route path="/user/resetpassword" element={<Passwordreset />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:userType/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
