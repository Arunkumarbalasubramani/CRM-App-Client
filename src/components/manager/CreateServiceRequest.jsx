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
const CreateServiceRequest = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const addSRFunction = async (newSRData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/crm/service-requests/add",
        newSRData
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
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      customer: "",
      title: "",
      description: "",
      status: "",
      assignedTo: "",
      priority: "",
    },

    onSubmit: (newSRData) => {
      // console.log(newSRData);
      addSRFunction(newSRData);
    },
  });

  return (
    <div className="main-container">
      <div className="header-container">
        <h3 className="heading-text">Create Service request</h3>
      </div>
      {success ? (
        <div className="createform-container">
          <h1>Service Request Created Successfully</h1>
          <Tooltip title="Back">
            <IconButton size="large">
              <LoginIcon
                onClick={() => navigate("/manager/service-requests")}
              />
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
                  label="Customer"
                  variant="outlined"
                  className="form-input"
                  value={values.customer}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="customer"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  className="form-input"
                  name="title"
                  type="text"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  className="form-input"
                  name="description"
                  type="text"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  name="status"
                  label="Status"
                  type="text"
                  value={values.status.toLowerCase()}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  name="assignedTo"
                  label="Assigned To"
                  type="text"
                  value={values.assignedTo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="outlined-basic"
                  name="priority"
                  label="Priority"
                  type="text"
                  value={values.priority.toLowerCase()}
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

export default CreateServiceRequest;
