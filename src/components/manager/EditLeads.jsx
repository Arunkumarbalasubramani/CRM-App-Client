import React, { useState, useEffect } from "react";
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

const EditLeads = () => {
  const { id } = useParams();
  const [leadsData, setLeadsData] = useState(null);
  useEffect(() => {
    const getLeadsData = async () => {
      const response = await axios.get(
        `https://crm-server-akb.onrender.com/crm/leads/${id}`
      );
      setLeadsData(response.data[0]);
    };
    getLeadsData();
  }, []);

  return (
    <div className="main-container">
      <div className="header-container">
        <h3 className="heading-text">{`Edit Lead`}</h3>
      </div>
      {leadsData ? (
        <EditLeadsForm leadsData={leadsData} id={id} />
      ) : (
        <div>Loading .......</div>
      )}
    </div>
  );
};

export default EditLeads;

export const EditLeadsForm = ({ leadsData, id }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { leadName, leadEmail, company, phone, remarks, leadSource, status } =
    leadsData;
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: {
      leadName: leadName,
      leadEmail: leadEmail,
      company: company,
      phone: phone,
      leadSource: leadSource,
      remarks: remarks,
      status: status,
    },

    onSubmit: (editedLeadData) => {
      editLeadFunction(editedLeadData);
    },
  });
  const editLeadFunction = async (editedLeadData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/crm/leads/${id}/edit`,
        editedLeadData
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
    <div>
      {success ? (
        <div className="createform-container">
          <h1>Lead Edited Successfully</h1>
          <Tooltip title="Back">
            <IconButton size="large">
              <ArrowBackIosIcon onClick={() => navigate("/manager/leads")} />
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
                  id="leadName"
                  label="Lead Name"
                  variant="outlined"
                  className="form-input"
                  value={values.leadName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="leadName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <TextField
                  id="leadEmail"
                  label="Lead Email"
                  variant="outlined"
                  className="form-input"
                  name="leadEmail"
                  type="text"
                  value={values.leadEmail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="company"
                  label="Company"
                  variant="outlined"
                  className="form-input"
                  name="company"
                  type="text"
                  value={values.company}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="phone"
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
                  id="leadSource"
                  name="leadSource"
                  label="Lead Source"
                  type="text"
                  value={values.leadSource}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <TextField
                  id="remarks"
                  name="remarks"
                  label="Remarks"
                  type="text"
                  value={values.remarks}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  className="form-input"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 drop-down"
                value={values.status}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <label for="status">Choose Status:</label>
                <select name="status" id="status">
                  <option value="employee"></option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>

                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                  <option value="canceled">Canceled</option>
                  <option value="confirmed">Confirmed</option>
                </select>
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
