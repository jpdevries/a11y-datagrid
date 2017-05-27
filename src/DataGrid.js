import React, { Component } from 'react';

import store from './model/store';
import * as actions from './model/actions';

import DataGridRow from './DataGridRow';

export default class DataGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedSettings: []
    }
  }

  checkSetting = (uuid, checked) => {
    console.log('checkSetting', uuid, checked);
    let checkedSettings = this.state.checkedSettings;
    if(checked) {
      checkedSettings.push(uuid);
    } else {
      checkedSettings = checkedSettings.filter((setting) => (setting !== uuid));
    }
    setTimeout(() => {
      this.setState({
        checkedSettings
      });
      store.dispatch(actions.updateView({
        checkedSettings
      }));
    }, 0);
  }

  render() {
    const props = this.props,
    state = this.state;

    console.log(props);
    console.log(state);

    let filteredSettings = props.filteredSettings;

    if(props.search) {
      const search = props.search.toLowerCase();
      filteredSettings = filteredSettings.filter((setting) => {
        if(setting.uuid.toLowerCase().indexOf(props.search) > -1) {
          return true;
        }
        return false;
      })
    }

    const rows = filteredSettings.map((setting, index) => (
      <DataGridRow key={`${setting.key}`} {...setting} checkSetting={this.checkSetting} />
    ));

    return (
      <table>
        <thead>
          <tr>
            <th className="select">
            <label htmlFor="check_all">
              <span className="visually-hidden">Select</span>
              <input type="checkbox" name="check_all" id="check_all" onChange={(event) => {
                const inputs = document.querySelectorAll('input[name="checked_settings"]'),
                checkedSettings = (event.target.checked) ? filteredSettings : [];

                for(let i = 0; i < inputs.length; i++) {
                  inputs[i].checked = event.target.checked;
                }

                this.setState({
                  checkedSettings: checkedSettings
                });

                store.dispatch(actions.updateView({
                  //checkedSettings
                  foo: 'bar'
                }));

              }} />
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
}
