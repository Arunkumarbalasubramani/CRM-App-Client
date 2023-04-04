import "./App.scss";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import Registration from "./components/admin/Registration";
import Passwordreset from "./components/admin/Passwordreset";

import ResetPasswordForm from "./components/admin/ResetPasswordForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import UserDashboard from "./components/user/UserDashboard";
import EditUser from "./components/admin/EditUser";
import DeleteUser from "./components/admin/DeleteUser";
import CreateServiceRequest from "./components/manager/CreateServiceRequest";
import EditServiceRequest from "./components/manager/EditServiceRequest";
import CreateLeads from "./components/manager/CreateLeads";
import EditLeads from "./components/manager/EditLeads";
import CreateContact from "./components/manager/CreateContact";
import EditContact from "./components/manager/EditContact";
import ServiceRequests from "./components/manager/ServiceRequests";
import Contacts from "./components/manager/Contacts";
import Leads from "./components/manager/Leads";
import MoreDetails from "./components/manager/MoreDetails";
import DeletePage from "./components/manager/DeletePage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/register" element={<Registration />} />
          <Route
            path="/user/:useremail/resetpassword"
            element={<Passwordreset />}
          />
          <Route path="/login" element={<Login />} />

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
            path="/:role/servicerequest/:id/edit"
            element={<EditServiceRequest />}
          />
          <Route path="/:role/:type/:id/delete" element={<DeletePage />} />
          <Route path="/:role/leads/add" element={<CreateLeads />} />
          <Route path="/:role/leads/:id/edit" element={<EditLeads />} />
          <Route path="/:role/contacts/add" element={<CreateContact />} />
          <Route path="/:role/contacts/:id/edit" element={<EditContact />} />
          <Route path="/user/:useremail/edit" element={<EditUser />} />
          <Route path="/user/:useremail/delete" element={<DeleteUser />} />
          <Route path="/:role/service-requests" element={<ServiceRequests />} />
          <Route path="/:role/contacts" element={<Contacts />} />
          <Route path="/:role/leads" element={<Leads />} />
          <Route
            path="/service-requests/:requestId"
            element={<MoreDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
