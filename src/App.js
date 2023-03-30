import "./App.scss";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Passwordreset from "./components/Passwordreset";
import HomePage from "./components/HomePage";
import ResetPasswordForm from "./components/ResetPasswordForm";
import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import UserDashboard from "./components/UserDashboard";
import CreateServiceRequest from "./components/CreateServiceRequest";
import EditServiceRequest from "./components/EditServiceRequest";
import CreateLeads from "./components/CreateLeads";
import EditLeads from "./components/EditLeads";
import CreateContact from "./components/CreateContact";
import EditContact from "./components/EditContact";
import EditUser from "./components/EditUser";
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
          <Route
            path="/passwordreset/:id/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route
            path="/:role/servicerequest/add"
            element={<CreateServiceRequest />}
          />
          <Route
            path="/:role/servicerequest/edit"
            element={<EditServiceRequest />}
          />
          <Route path="/:role/leads/add" element={<CreateLeads />} />
          <Route path="/:role/leads/edit" element={<EditLeads />} />
          <Route path="/:role/contacts/add" element={<CreateContact />} />
          <Route path="/:role/contacts/edit" element={<EditContact />} />
          <Route path="/user/:useremail/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
