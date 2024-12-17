import React from "react";

const Search = ({ searchKey, setSearchKey }) => {
  return (
    <div className="user-search-area">
      <input
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        type="text"
        className="user-search-text"
      />
      <i className="fa fa-search user-search-btn" aria-hidden="true"></i>
    </div>
  );
};

export default Search;
