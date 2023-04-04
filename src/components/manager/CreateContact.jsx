import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Alert from "react-bootstrap/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
const CreateContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const addContactFunction = async (newContactData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/crm/contacts/add",
        newContactData
      );
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Response from Server");
      } else {
        setErrorMsg(`${error?.response.data.Error}`);
      }
    }
  };
  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues: {
        contactName: "",
        accountName: "",
        contactEmail: "",
        phone: "",
        address: "",
      },

      onSubmit: (newContactData) => {
        addContactFunction(newContactData);
        // console.log(newContactData);
      },
    });

  return (
    <div className="main-container">
      <div className="header-container">
        <h3 className="heading-text">Create Contact</h3>
      </div>
      {success ? (
        <div className="createform-container">
          <h1>Contact Created Successfully</h1>
          <Tooltip title="Back">
            <IconButton size="large">
              <LoginIcon onClick={() => navigate("/manager/contacts")} />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <>
          <div className="createform-container">
            <div>
              {loading ? <CircularProgress color="success" /> : null}
              {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : null}
            </div>
            <Form onSubmit={handleSubmit} className="forms">
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  label="Contact Name"
                  variant="outlined"
                  className="form-input"
                  value={values.contactName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="contactName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  label="Account Name"
                  variant="outlined"
                  className="form-input"
                  name="accountName"
                  type="text"
                  value={values.accountName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  label="Contact Email"
                  variant="outlined"
                  className="form-input"
                  name="contactEmail"
                  type="text"
                  value={values.contactEmail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  name="phone"
                  label="Phone"
                  type="text"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  name="address"
                  label="Address"
                  type="text"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  className="form-input"
                />
              </Form.Group>

              <Button variant="contained" size="large" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateContact;
