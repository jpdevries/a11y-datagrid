import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';

import slug from 'slugg';

import path from 'path';

class Header extends Component {

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
      ));


      return (
        <optgroup key={key} label={key}>
         {options}
        </optgroup>
      );
    });

    function tallyByArea(area) {
      //console.log('tally', props.filteredSettings);
      let t = 0;
      props.settings.filter((setting) => (
        setting.namespace === props.view.namespace
      )).forEach((setting) => {
        if(setting.area == area) t++
      });
      return t;
    }

    function tallyByXtype(xtype) {
      let t = 0;
      props.settings.filter((setting) => (
        setting.namespace === props.view.namespace
      )).forEach((setting) => {
        if(setting.xtype == xtype) t++
      });
      return t;
    }

    const areas = props.areas.map((area) => {
      const tally = tallyByArea(area);
      return (
        <option disabled={!tally} key={area} value={slug(area)}>{area} ({tally})</option>
      );
    }),
    xtypes = props.xtypes.map((xtype) => {
      const tally = tallyByXtype(xtype);
      return (
        <option disabled={!tally} key={xtype} value={slug(xtype)}>{xtype} ({tally})</option>
      );
    }),
    allLength = props.settings.filter((setting) => (setting.namespace == props.view.namespace)).length;

    return (
      <header>
      <p hidden id="sort-by">Sort by</p>
      <div className="sometimes flexible button-bar">
        <button onClick={(event) => {
          alert('Pretend an accessible modal comes up to Create New Setting in and of the current namespace, area, xtype')
        }}>Create New Setting</button>



        <button hidden={!(props.view.checkedSettings.length)} disabled={!(props.view.checkedSettings.length)} onClick={(event) => {
          const inputs = document.querySelectorAll('input[name="checked_settings"]');

          for(let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.checked = !input.checked;
          }

        }}>Invert Selection</button>

        <button hidden={!(props.view.checkedSettings.length)} disabled={!(props.view.checkedSettings.length)} onClick={(event) => {
          store.dispatch(actions.deleteSettings(props.view.checkedSettings));
        }}>Delete{props.view.checkedSettings.length ? ` ${props.view.checkedSettings.length}` : ''} Item{props.view.checkedSettings.length > 1 ? 's' : ''}</button>

      </div>
      <h3 className="sometimes visually-hidden">Filter By</h3>
      <div className="namespace">
        <label htmlFor="namespace"><span className="visually-hidden">Filter by </span>Namespace&ensp;</label>
        <select name="namespace" id="namespace" value={props.view.namespace} onChange={(event) => {
          store.dispatch(actions.updateView(Object.assign({}, props.view, {
            namespace: event.target.value,
            area: props.view.area,
            page: 1
          })));
          this.props.history.push(path.join('/', `${event.target.value}`));
        }}>
          {optgroups}
        </select>
      </div>
      <div className="area">
        <label htmlFor="area"><span className="visually-hidden">Filter by </span>Area&ensp;</label>
        <select name="area" id="area" value={props.view.area || ''} onChange={(event) => {
          store.dispatch(actions.updateView({
            area: event.target.value,
            namespace: props.view.namespace,
            page: 1
          }));
          this.props.history.push(path.join('/', props.view.namespace, `${event.target.value}`));
        }}>
          <option value="all">All ({allLength})</option>
          {areas}
        </select>
      </div>
      <div className="xtype">
        <label htmlFor="xtype"><span className="visually-hidden">Filter by </span><span className="small caps">xtype</span>&ensp;</label>
        <select name="xtype" id="xtype" value={props.view.xtype || ''} onChange={(event) => {
          store.dispatch(actions.updateView({
            xtype: event.target.value,
            namespace: props.view.namespace,
            area: props.view.area,
            page: 1
          }));
          console.log(path.join('/', props.view.namespace || '', props.view.area || 'all', `${event.target.value}`));
          this.props.history.push(path.join('/', props.view.namespace || '', props.view.area || 'all', `${event.target.value}`));
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
            area: undefined,
            namespace: props.view.namespace,
            xtype: undefined
          }));
          this.setState({
            search: ''
          });
          props.onSearch(event.target.value);
          this.props.history.push(path.join('/', props.view.namespace || ''));
        }}>Clear Filters</button>

      </div>
      </header>
    );
  }
}

export default withRouter(Header);
