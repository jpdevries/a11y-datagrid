import React, { Component } from 'react';

import DataGridRow from './DataGridRow';

export default function(props) {

  let filteredSettings = props.filteredSettings;
  
  if(props.search) {
    const search = props.search.toLowerCase();
    filteredSettings = filteredSettings.filter((setting) => {
      if(setting.settingKey.toLowerCase().indexOf(props.search) > -1) {
        return true;
      }
      return false;
    })
  }

  const rows = filteredSettings.map((setting, index) => (
    <DataGridRow key={`${setting.key}`} {...setting} />
  ));


  return (
    <table>
      <thead>
        <tr>
          <th className="select">
          <label htmlFor="check_all">
            <span className="visually-hidden">Select</span>
            <input type="checkbox" name="check_all" id="check_all" />
          </label>
          </th>
          <th className="name">Name</th>
          <th className="key">Key</th>
          <th className="value">Value</th>
          <th className="last-modified">Last Modified</th>
          <th className="visually-hidden update-setting">Update Setting</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
