/** @format */

import { useSelector } from "react-redux";
/** @format
 * @description
 * Student instructions:
 * Copy paste your code from the RequestStatus.jsx file here from the previous week. Implement redux logic to fetch the status from the redux store.
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 */
/*
export const RequestStatus = () => {
  return (
    <div>
      <h3>Request status</h3>
      TODO: RequestStatus
    </div>
  );
};*/

import React from 'react';

export const RequestStatus = () => {
  const status = useSelector((state) => state.status);
  return <div id="request-status">
    {status}
    </div>;
};
export default RequestStatus;
