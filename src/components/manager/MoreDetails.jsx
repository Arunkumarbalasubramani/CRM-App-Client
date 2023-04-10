import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import Details from "./Details";

const MoreDetails = () => {
  const { requestId } = useParams();
  const [servicerequestData, setServicerequestData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://crm-server-akb.onrender.com/crm/service-requests/${requestId}`
      );
      setServicerequestData(response.data);
    };
    getData();
  }, [requestId]);

  return (
    <div className="main-container">
      <div className="header-container">
        <h3 className="heading-text">More Info</h3>
      </div>
      <div className="body-container">
        {servicerequestData ? (
          <Details servicerequestData={servicerequestData} />
        ) : null}
      </div>
    </div>
  );
};

export default MoreDetails;
