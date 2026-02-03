import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/actionCreators/searchActions';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.searchQuery);

    const handleChange = (event) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return(
        <input
        type="text"
        placeholder='Search players...'
        value={searchQuery}
        onChange={handleChange}
        />
    ); 

};

export default SearchBar;
