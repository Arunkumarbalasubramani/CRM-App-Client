import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import { useFormik } from "formik";
import axios from "axios";

import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

const EditForm = ({ userData }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const edituserFunction = async (editeduserData) => {
    try {
      const { _id, role } = editeduserData;
      const data = { _id: _id, role: role };
      setLoading(true);
      const response = await axios.post(
        "https://crm-server-akb.onrender.com/users/change-role",
        data
      );
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    setValues,
  } = useFormik({
    initialValues: { ...userData },
    // validationSchema: userValidationSchema,
    onSubmit: (editeduserData) => {
      edituserFunction(editeduserData);
    },
  });

  return (
    <>
      {success ? (
        <div className="success-container">
          <h1>User Details Updated Successfully</h1>
          <Tooltip title="Back">
            <IconButton size="large">
              <LoginIcon onClick={() => navigate("/admin/dashboard")} />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="form-input"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                error={touched.email && errors.email}
              />
              {touched.email && errors.email ? (
                <Alert variant="danger">{errors.email}</Alert>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className="form-input"
                name="fname"
                type="text"
                value={values.fname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.fname && errors.fname}
              />
              {touched.fname && errors.fname ? (
                <Alert variant="danger">{errors.fname}</Alert>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className="form-input"
                name="lname"
                type="text"
                value={values.lname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.lname && errors.lname}
              />
              {touched.lname && errors.lname ? (
                <Alert variant="danger">{errors.lname}</Alert>
              ) : null}
            </Form.Group>

            <Form.Group
              className="mb-3 drop-down"
              onBlur={handleBlur}
              onChange={handleChange}
              id="role"
              name="role"
            >
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {values.role}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setValues({ ...values, role: "manager" })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="manager"
                    name="manager"
                  >
                    Manager
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setValues({ ...values, role: "employee" })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="employee"
                    name="employee"
                  >
                    Employee
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setValues({ ...values, role: "admin" })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="admin"
                    name="admin"
                  >
                    Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Button variant="contained" size="large" type="submit">
              Edit Details
            </Button>
          </Form>
          <div className="further-actions">
            <Nav.Link
              variant="body2"
              onClick={() => navigate(`/user/${values.email}/resetpassword`)}
              className="further-link"
            >
              {"Reset Password"}
            </Nav.Link>
          </div>
        </div>
      )}
    </>
  );
};
export default EditForm;
