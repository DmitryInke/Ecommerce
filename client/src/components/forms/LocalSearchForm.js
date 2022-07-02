import React from 'react';

const LocalSearchForm = ({ keyword, setKeyword }) => {
  const handleSearchChange = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default LocalSearchForm;
