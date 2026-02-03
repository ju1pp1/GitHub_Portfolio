import React from "react";

export const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <input
    type="text"
    placeholder="Search players..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};
