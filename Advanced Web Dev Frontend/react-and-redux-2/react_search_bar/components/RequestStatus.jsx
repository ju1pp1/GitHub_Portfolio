/** @format 
 
  Short instructions
  ------------------
  This component is used to display the status of a request. It receives new status as children. 
  
  NOTE:for ids, classes and html elements refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
*/
import React from 'react';

export const RequestStatus = ({children}) => {
  return <div id="request-status">
    {children}
    </div>;
};
export default RequestStatus;
