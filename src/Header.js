import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: undefined
    };
  }

  render() {
    const props = this.props;

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
    });

    const areas = props.areas.map((area) => (
      <option key={area} value={area}>{area}</option>
    )),
    xtypes = props.xtypes.map((xtype) => (
      <option key={xtype} value={xtype}>{xtype}</option>
    ));

    return (
      <header>
      <div className="flexible">
        <button>Create New Setting</button>

        <button hidden={!(props.view.checkedSettings.length)} disabled={!(props.view.checkedSettings.length)} onClick={(event) => {
          const inputs = document.querySelectorAll('input[name="checked_settings"]');

          for(let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.checked = !input.checked;
          }

        }}>Invert Selection</button>

        <button hidden={!(props.view.checkedSettings.length)} disabled={!(props.view.checkedSettings.length)} onClick={(event) => {

        }}>Delete{props.view.checkedSettings.length ? ` ${props.view.checkedSettings.length}` : ''} Item{props.view.checkedSettings.length > 1 ? 's' : ''}</button>

      </div>
      <div className="namespace">
        <label htmlFor="namespace"><span className="visually-hidden">Filter by </span>Namespace&ensp;</label>
        <select name="namespace" id="namespace" value={props.view.namespace} onChange={(event) => {
          store.dispatch(actions.updateView({
            namespace: event.target.value
          }));
        }}>
          {optgroups}
        </select>
      </div>
      <div className="area">
        <label htmlFor="area"><span className="visually-hidden">Filter by </span>Area&ensp;</label>
        <select name="area" id="area" value={props.view.area} onChange={(event) => {
          store.dispatch(actions.updateView({
            area: event.target.value
          }))
        }}>
          <option value="">All</option>
          {areas}
        </select>
      </div>
      <div className="xtype">
        <label htmlFor="xtype"><span className="visually-hidden">Filter by </span><span className="small caps">xtype</span>&ensp;</label>
        <select name="xtype" id="xtype" value={props.view.xtype} onChange={(event) => {
          store.dispatch(actions.updateView({
            xtype: event.target.value
          }))
        }}>
          <option value="">All</option>
          {xtypes}
        </select>
      </div>
      <div className="search">
        <label htmlFor="search">Search&ensp;</label>
        <div><input type="text" name="search" id="search" placeholder="access_category_enabled" value={this.state.search} onChange={(event) => {
          this.setState({
            search: event.target.value
          });
          props.onSearch(event.target.value);
        }} /></div>
      </div>
      <div className="clear-submit">
        <button type="reset" onClick={(event) => {
          store.dispatch(actions.updateView({
            area: ''
          }));
          this.setState({
            search: ''
          });
          props.onSearch(event.target.value);
        }}>Clear Filters</button>
        <button type="submit">Submit</button>
      </div>
      </header>
    );
  }
}
