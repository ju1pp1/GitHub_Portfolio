import { useSelector } from "react-redux";

import React from 'react';

export const RequestStatus = () => {
  const status = useSelector((state) => state.status);
  return <div id="request-status">
    {status}
    </div>;
};
export default RequestStatus;
