import React, { Component } from 'react';

import classNames from 'classnames';

import store from './model/store';
import * as actions from './model/actions';

export default class DataGridRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  formatValue() {
    const props = this.props,
    value = props.value;

    switch(props.xtype) {
      case 'combo-boolean':
      case 'modx-combo-boolean':
      return (value == "1" ) ? "Yes" : "No";
      break;

      default:
      return value.toString();
      break;
    }
  }

  render() {
    const props = this.props,
    state = this.state;

    return (
      <tr tabIndex="0" className={classNames({
        'focused': state.focused
      })} onFocus={(event) => {
        if(!event.target.matches('tr')) return;
        [...event.target.closest('tbody').querySelectorAll(':scope > tr[tabindex].focused')].forEach((focused) => {
          if(event.target !== focused) focused.classList.remove('focused')
        });

        event.target.classList.add('focused');

        this.setState({
          focused: true
        })
      }}>
        <td className="select">
          <label htmlFor={`checked_${props.uuid}`}>
            <input aria-labelledby="select-cell" aria-describedby={`select_${props.uuid}`} type="checkbox" name={`checked_settings[]`} id={`checked_${props.uuid}`} onChange={(event) => {
              console.log(event.target.checked);
              props.checkSetting(props.uuid, event.target.checked);
            }} />
          </label>
        </td>
        <td className="name" data-xtype={props.xtype}><span id={`select_${props.uuid}`}>{props.name}</span></td>
        <td className="key"><code>{props.uuid}</code></td>
        <td className="value">
          <code>{this.formatValue()}</code>
        </td>
        <td className="last-modified">
          <code>{new Date(Math.floor(Math.random() * new Date().getTime())).toLocaleDateString()}</code>
        </td>
        <td className="update-setting">
          <div className="flexible button-bar">
            <div>
              <button onClick={(event) => {
                alert(`Pretend an accessible modal just opened up! Editing ${props.name}`);
              }}>Update<span className="visually-hidden"> Check Category Access</span></button>
            </div>
            <div>
              <button className="dangerous" onClick={(event) => {
                store.dispatch(actions.deleteSetting(props.uuid));
                event.target.closest('tr').nextElementSibling.focus();
              }}>Delete<span className="visually-hidden"> Check Category Access</span></button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
