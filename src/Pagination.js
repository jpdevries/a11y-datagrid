import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

export default function Pagination(props) {
  //const allLength = props.settings.filter((setting) => (setting.namespace == props.view.namespace)).length;
  const allLength = props.filteredSettings.length;

  const numPages = Math.max(1, Math.ceil(allLength / props.view.perPage));
  console.log('numPages', numPages);
  const pages = (() => {
    const opts = [];
    for(let i = 1; i <= numPages; i++) {
      opts.push(
        <option value={i}>{i}</option>
      )
    }
    return opts;
  })();


  const perPage = !isNaN(props.view.perPage) ? props.view.perPage : 10;

  console.log((props.view.page - 1) * perPage, ((props.view.page - 1) * perPage) + perPage);
  const start = ((props.view.page - 1) * perPage) + 1,
  end = Math.min(allLength, ((props.view.page - 1) * perPage) + perPage);

  return (
    <nav className="sometimes flexible pagination">
      <button disabled={props.view.page < 3}>First Page</button>
      <button disabled={props.view.page < 2}>Previous Page</button>

      <div>
        <label htmlFor="page">Page&ensp;</label>
        <select name="page" id="page" value={props.view.page} onChange={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            page: parseInt(event.target.value)
          })))
        }}>
          {pages}
        </select>
        <span>&ensp;of {numPages}</span>
      </div>

      <button disabled={(numPages - props.view.page) < 1}>Next Page</button>
      <button disabled={(numPages - props.view.page) < 2}>Last Page</button>

      <button>Refresh</button>

      <div>
        <label htmlFor="per-page">Per Page&ensp;</label>
        <input type="number" id="per-page" name="per-page" value={props.view.perPage} min="10" step="1" onChange={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            perPage: parseInt(event.target.value)
          })))
        }} />
      </div>

      <small aria-live="polite" aria-atomic="true">Displaying {start} <span aria-label="through">&ndash;</span> {end} of {allLength}</small>

    </nav>
  );
}
