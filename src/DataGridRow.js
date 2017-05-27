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
          <label htmlFor={`checked_${props.settingKey}`}>
            <input type="checkbox" name={`checked_${props.settingKey}`} id={`checked_${props.settingKey}`} />
          </label>
        </td>
        <td className="name">{props.name}</td>
        <td className="key"><code>{props.settingKey}</code></td>
        <td className="value">
          Yes
        </td>
        <td className="last-modified">May 1, 2017</td>
        <td className="update-setting">
          <div className="flexible button-bar">
            <div>
              <button onClick={(event) => {
                alert('Pretend an accessible modal just opened up!');
              }}>Update<span className="visually-hidden"> Check Category Access</span></button>
            </div>
            <div>
              <button className="dangerous" onClick={(event) => {
                store.dispatch(actions.deleteSetting(props.uid));
                event.target.closest('tr').nextElementSibling.focus();
              }}>Delete<span className="visually-hidden"> Check Category Access</span></button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
