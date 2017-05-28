import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

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
    //console.log(props);

    return (
      <div className="App">

        <Header {...props} onSearch={this.handleSearch} />
        <Pagination {...props} />
        <DataGrid {...props} search={this.state.search} />

      </div>
    );
  }
}
