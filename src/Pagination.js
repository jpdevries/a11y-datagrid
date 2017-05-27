import React, { Component } from 'react';

export default function Pagination(props) {
  return (
    <nav className="sometimes flexible pagination">
      <button>First Page</button>
      <button>Previous Page</button>

      <div>
        <label htmlFor="page">Page&ensp;</label>
        <select name="page" id="page" value="1">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <span>&ensp;of 8</span>
      </div>

      <button>Next Page</button>
      <button>Last Page</button>

      <button>Refresh</button>

      <div>
        <label htmlFor="per-page">Per Page&ensp;</label>
        <input type="number" id="per-page" name="per-page" value="30" min="10" step="1" />
      </div>

      <small>Displaying 1 &ndash; 30 of 231</small>

    </nav>
  );
}
