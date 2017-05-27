import React, { Component } from 'react';

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
        <DataGrid {...props} search={this.state.search} />
        <Pagination {...props} />
      </div>
    );
  }
}
