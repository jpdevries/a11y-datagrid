import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

import { HashRouter, Switch, Route, Link, BrowserRouter, withRouter } from 'react-router-dom';

import Header from './Header';
import DataGrid from './DataGrid';
import ModalCreateSetting from './ModalCreateSetting';
import Pagination from './Pagination';

export default class SettingsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: undefined
    }
  }

  componentWillMount() {
    store.dispatch(actions.updateView(this.props.view)); // kinda #janky
  }

  handleSearch = (search) => {
    console.log(search);
    this.setState({
      search: search || undefined
    })
  }

  render() {
    const props = this.props;
    console.log(props);

    return (
      <BrowserRouter>
      <div className="a11y-datagrid">

        <Header {...props} onSearch={this.handleSearch} />
        <Pagination {...props} />


        <Route exact path='/:namespace/:area/:xtype' render={(routeProps) => (
          <DataGrid key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>
        <Route exact path='/:namespace/:area' render={(routeProps) => (
          <DataGrid key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>
        <Route exact path='/:namespace' render={(routeProps) => (
          <DataGrid key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>
        <Route exact path='/' render={(routeProps) => (
          <DataGrid key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>

      </div>
      </BrowserRouter>
    );
  }
}
