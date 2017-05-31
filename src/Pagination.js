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
        <option key={i} value={i}>{i}</option>
      )
    }
    return opts;
  })();


  const perPage = !isNaN(props.view.perPage) ? props.view.perPage : 10;

  console.log((props.view.page - 1) * perPage, ((props.view.page - 1) * perPage) + perPage);
  const start = ((props.view.page - 1) * perPage) + 1,
  end = Math.min(allLength, ((props.view.page - 1) * perPage) + perPage);

  return (
    <nav aria-hidden={props['aria-hidden']} className="sometimes flexible pagination">
      <div className="flexible button-bar">
        <button disabled={props.view.page < 3} aria-controls={props.view.tableId} onClick={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            page: 1
          })));
        }}>First Page</button>
        <button disabled={props.view.page < 2} aria-controls={props.view.tableId} onClick={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            page: Math.max(1, props.view.page - 1)
          })));
        }}>Previous Page</button>
      </div>

      <div className="page-of">
        <label htmlFor="page">Page&ensp;</label>
        <select disabled={numPages < 2} name="page" id="page" value={props.view.page} aria-controls={props.view.tableId} onChange={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            page: parseInt(event.target.value)
          })))
        }}>
          {pages}
        </select>
        <span>&ensp;of {numPages}</span>
      </div>

      <div className="flexible button-bar">
        <button disabled={(numPages - props.view.page) < 1} aria-controls={props.view.tableId} onClick={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            page: Math.min(props.view.page + 1, numPages)
          })));
        }}>Next Page</button>
        <button disabled={(numPages - props.view.page) < 2} aria-controls={props.view.tableId} onClick={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            page: numPages
          })));
        }}>Last Page</button>

        <button aria-controls={props.view.tableId}>Refresh</button>
      </div>

      <div className="sort-dir">
      <fieldset>
        <legend className="visually-hidden">Sort Direction</legend>
        <div className="sometimes flexible">
        <span aria-hidden>Sort Direction</span>
        <label htmlFor="sort-dir-asc">
          <input aria-label="ascending" aria-controls={props.view.tableId} checked={props.view.sort.dir == "ASC"} type="radio" id="sort-dir-asc" name="sort-dir" value="ASC" onChange={(event) => {
            store.dispatch(actions.updateView(
              Object.assign({}, props.view, {
                sort: Object.assign({}, props.view.sort, {
                  dir: event.target.value
                })
              })
            ))
          }} />
          <small>ASC</small>
        </label>
        <label htmlFor="sort-dir-desc">
          <input aria-label="descending" aria-controls={props.view.tableId} checked={props.view.sort.dir == "DESC"} type="radio" id="sort-dir-desc" name="sort-dir" value="DESC" onChange={(event) => {
            store.dispatch(actions.updateView(
              Object.assign({}, props.view, {
                sort: Object.assign({}, props.view.sort, {
                  dir: event.target.value
                })
              })
            ))
          }} />
          <small>DESC</small>
        </label>
        </div>
      </fieldset>
      </div>

      <div className="flexible displaying">
      <div>
        <label htmlFor="per-page">Per Page&ensp;</label>
        <input type="number" id="per-page" name="per-page" value={props.view.perPage} min="10" step="1" aria-controls={props.view.tableId} onChange={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            perPage: parseInt(event.target.value)
          })))
        }} style={{
          'minWidth': `${allLength.toString().length}em`
        }} />
      </div>

      <small aria-live="polite" aria-relevant="all" aria-atomic="true">Displaying {start} <span aria-label="through">&ndash;</span> {end} of {allLength}</small>

      </div>
    </nav>
  );
}
