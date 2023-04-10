import axios from "axios";
import React, { useEffect, useState } from "react";

const Details = ({ servicerequestData }) => {
  const {
    requestId,
    title,
    customer,
    description,
    status,
    assignedTo,
    priority,
    createdAt,
  } = servicerequestData;
  const getRandomDate = () => {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContactDetails = async () => {
      const response = await axios.get(
        `https://crm-server-akb.onrender.com/crm/contacts/${customer}`
      );
      setContacts(response.data[0]);
    };
    getContactDetails();
  }, []);
  const { accountName, contactEmail, contactName, phone } = contacts;
  return (
    <>
      <div className="data-table">
        <div className="service-title">
          <h2>{title}</h2>
          <h2>
            Service ID:<span>{requestId}</span>
          </h2>
        </div>
        <div className="service-data">
          <h5 className="task-details">Task Details</h5>
          <div className="seemore-details">
            <div className="task-heading">
              <h5 className="task-helper-text"> Subject </h5>
              <h5 className="task-helper-text">Due Date</h5>
              <h5 className="task-helper-text">Contact</h5>
              <h5 className="task-helper-text">Status</h5>
              <h5 className="task-helper-text">Created on</h5>
              <h5 className="task-helper-text">Priority</h5>
              <h5 className="task-helper-text">Assigned To</h5>
              <h5 className="task-helper-text">Description</h5>
            </div>
            <div className="task-data">
              <h5 className="task-helper-text"> {title} </h5>
              <h5 className="task-helper-text">{getRandomDate()}</h5>
              <h5 className="task-helper-text">{customer}</h5>
              <h5 className="task-helper-text">{status}</h5>
              <h5 className="task-helper-text">{getRandomDate()}</h5>
              <h5 className="task-helper-text">{priority}</h5>
              <h5 className="task-helper-text">{assignedTo}</h5>
              <h5 className="task-helper-text">{description}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-data">
        <h1 className="contact-info"> Customer Details</h1>
        {contacts ? (
          <div className="customerData">
            <div className="data">
              <h5 className="task-helper-text"> Name : </h5>
              <h5 className="task-helper-text"> Email : </h5>
              <h5 className="task-helper-text"> Phone : </h5>
              <h5 className="task-helper-text"> Account : </h5>
            </div>
            <div className="data">
              <h5 className="task-helper-text"> {contactName} </h5>
              <h5 className="task-helper-text"> {contactEmail} </h5>
              <h5 className="task-helper-text"> {phone} </h5>
              <h5 className="task-helper-text"> {accountName} </h5>
            </div>
          </div>
        ) : (
          <div>Loading .....</div>
        )}
      </div>
    </>
  );
};

export default Details;
