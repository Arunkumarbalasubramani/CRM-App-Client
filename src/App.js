import "./App.scss";
import { Routes, Route } from "react-router-dom";
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
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import UnAuthorized from "./components/UnAuthorized";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<Missing />} />

        {/* ProtectedRoutes  - All*/}

        <Route
          path="/user/:useremail/resetpassword"
          element={<Passwordreset />}
        />
        <Route
          path="/passwordreset/:id/:token"
          element={<ResetPasswordForm />}
        />
        {/* Protected Routes- Admin */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user/:useremail/edit" element={<EditUser />} />
          <Route path="/user/:useremail/delete" element={<DeleteUser />} />
          <Route path="/user/register" element={<Registration />} />
        </Route>

        {/* Protected Routes- User */}
        <Route element={<RequireAuth allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

        {/* Protected Routes- Manager and Creator */}
        <Route element={<RequireAuth allowedRoles={["manager", "creator"]} />}>
          <Route
            path="/:role/servicerequest/add"
            element={<CreateServiceRequest />}
          />
          <Route path="/:role/leads/add" element={<CreateLeads />} />
          <Route path="/:role/contacts/add" element={<CreateContact />} />
        </Route>

        {/* Protected Routes- Manager and Editor */}
        <Route element={<RequireAuth allowedRoles={["manager", "editor"]} />}>
          <Route
            path="/:role/servicerequest/:id/edit"
            element={<EditServiceRequest />}
          />
          <Route path="/:role/leads/:id/edit" element={<EditLeads />} />
          <Route path="/:role/contacts/:id/edit" element={<EditContact />} />
        </Route>
        <Route
          element={
            <RequireAuth allowedRoles={["manager", "creator", "editor"]} />
          }
        >
          <Route path="/:role/service-requests" element={<ServiceRequests />} />
          <Route path="/:role/dashboard" element={<ManagerDashboard />} />
          <Route path="/:role/contacts" element={<Contacts />} />
          <Route path="/:role/leads" element={<Leads />} />
          <Route
            path="/service-requests/:requestId"
            element={<MoreDetails />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
