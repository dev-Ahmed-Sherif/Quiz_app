import React from "react";

function SearchItem({ search, setSearch }) {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="ابحث"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchItem;
