import React from "react";

function SearchItem({ pattern, search, setSearch }) {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <input
        autoFocus
        id="search"
        type="text"
        role="searchbox"
        placeholder="ابحث"
        pattern={pattern}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchItem;
