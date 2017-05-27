import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

export default function Header(props) {

  const namespaces = props.namespaces;

  const optgroups = Object.keys(namespaces).map((key) => {

    const options = namespaces[key].map((namespace) => (
      <option key={namespace}>{namespace}</option>
    ))

    return (
      <optgroup key={key} label={key}>
       {options}
      </optgroup>
    );
  })


  return (
    <header>
      <div>
        <button>Create New Setting</button>
      </div>
      <div className="namespace">
        <label htmlFor="namespace">Namespace&ensp;</label>
        <select name="namespace" id="namespace" value={props.view.namespace} onChange={(event) => {
          store.dispatch(actions.updateView({
            namespace: event.target.value
          }));
        }}>
          {optgroups}
        </select>
      </div>
      <div className="area">
        <label htmlFor="area">Filter by area&ensp;</label>
        <select name="area" id="area">
          <option value="authentication">Authentication</option>
          <option value="cacheing">Cacheing</option>
        </select>
      </div>
      <div className="search">
        <label htmlFor="search">Search&ensp;</label>
        <div><input type="text" name="search" id="search" placeholder="access_category_enabled" onChange={(event) => {
          props.onSearch(event.target.value);
        }} /></div>
      </div>
      <div className="clear-submit">
        <button type="reset">Clear Filters</button>
        <button type="submit">Submit</button>
      </div>
    </header>
  );
}
