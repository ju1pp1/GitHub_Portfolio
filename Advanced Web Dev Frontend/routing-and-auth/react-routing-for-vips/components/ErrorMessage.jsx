// A React component that displays an error message, loading message from the Redux store

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Component that displays an error message from the Redux store.
 *  
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 *  
 * @requires useSelector
 */

export default function ErrorMessage() {
    const error = useSelector((state) => state.error);

    if (!error) return null;

    return (
       <div>
            <h2>Error</h2>
            <p>{error}</p>
        </div>
    );
}