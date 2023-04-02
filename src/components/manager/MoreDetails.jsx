import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router";

const MoreDetails = () => {
  const { requestId } = useParams();
  const [servicerequestData, setServicerequestData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://localhost:5000/crm/service-requests/${requestId}`
      );
      setServicerequestData(response.data);
    };
    getData();
  }, [requestId]);
  console.log(servicerequestData);
  return (
    <div className="main-container">
      <div className="header-container">
        <h3 className="heading-text">More Info</h3>
      </div>
      <div className="moreInfo-container"></div>
    </div>
  );
};

export default MoreDetails;
