import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Alert from "react-bootstrap/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EditServiceRequest = () => {
  const { id, role } = useParams();
  const [sRData, setSRData] = useState(null);

  useEffect(() => {
    const getSRDataToEdit = async () => {
      const response = await axios.get(
        `https://crm-server-akb.onrender.com/crm/service-requests/${id}`
      );
      setSRData(response.data);
    };
    getSRDataToEdit();
  }, []);

  return (
    <div className="main-container">
      <div className="header-container">
        <h3 className="heading-text">{`Edit  Service request - ${id}`}</h3>
      </div>
      {sRData ? (
        <EditForm sRData={sRData} id={id} role={role} />
      ) : (
        <div>
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

export default EditServiceRequest;

export const EditForm = ({ sRData, id, role }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { customer, title, description, status, assignedTo, priority } = sRData;
  const [success, setSuccess] = useState(false);
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      customer: customer,
      title: title,
      description: description,
      status: status,
      assignedTo: assignedTo,
      priority: priority,
    },

    onSubmit: (editedSRData) => {
      editSRFunction(editedSRData);
      // console.log(editedSRData);
    },
  });
  const editSRFunction = async (editedSRData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/crm/service-requests/${id}/edit`,
        editedSRData
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

  return (
    <div className="createform-container">
      <div>
        {loading ? <CircularProgress color="success" /> : null}
        {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : null}
      </div>
      {success ? (
        <div className="createform-container">
          <h1>Service Request Edited Successfully</h1>
          <Tooltip title="Back">
            <IconButton size="large">
              <ArrowBackIosIcon
                onClick={() => navigate("/manager/service-requests")}
              />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="forms">
          <Form.Group className="mb-3">
            <TextField
              disabled={role === "user" ? true : false}
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
              value={values.status}
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
              disabled={role === "user" ? true : false}
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
              value={values.priority}
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
      )}
    </div>
  );
};
