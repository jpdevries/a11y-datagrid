import React, { Component } from 'react';

import * as actions from './model/actions';
import store from './model/store';

import { HashRouter, Switch, Route, Link, BrowserRouter, withRouter } from 'react-router-dom';

import Header from './Header';
import DataGrid from './DataGrid';
import ModalCreateSetting from './ModalCreateSetting';
import Pagination from './Pagination';

import Mousetrap from 'mousetrap';

import slug from 'slugg';

import ModalCreateNew from './ModalCreateNew';

const CREATE_NEW = 'create_new';

export default class SettingsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: undefined,
      dialog: undefined
    }
  }

  componentWillMount() {
    store.dispatch(actions.updateView(this.props.view)); // kinda #janky

    this.assignKeyboardListeners();
  }

  assignKeyboardListeners() {
    Mousetrap.bind(['alt+up'], this.handleKeyboardSortAscending);
    Mousetrap.bind(['alt+down'], this.handleKeyboardSortDescending);
    Mousetrap.bind(['esc'], this.handleKeyboardEscape);
    Mousetrap.bind(['ctrl+n'], this.handleCreateNew);
  }
  
  removeKeyboardListeners() {
    Mousetrap.unbind(['alt+up'], this.handleKeyboardSortAscending);
    Mousetrap.unbind(['alt+down'], this.handleKeyboardSortDescending);
    Mousetrap.unbind(['esc'], this.handleKeyboardEscape);
    Mousetrap.unbind(['ctrl+n'], this.handleCreateNew);
  }
  
  handleKeyboardEscape = (event) => {
    this.setState({
      dialog: undefined
    })
  }

  handleKeyboardSortAscending = (event) => {
    const props = this.props;

    store.dispatch(actions.updateView(
      Object.assign({}, props.view, {
        sort: Object.assign({}, props.view.sort, {
          dir: 'ASC'
        })
      })
    ))
  }

  handleKeyboardSortDescending = (event) => {
    const props = this.props;

    store.dispatch(actions.updateView(
      Object.assign({}, props.view, {
        sort: Object.assign({}, props.view.sort, {
          dir: 'DESC'
        })
      })
    ))
  }

  componentWillUnmount() {
    this.removeKeyboardListeners();
  }

  handleSearch = (search) => {
    console.log(search);
    this.setState({
      search: search || undefined
    })
  }
  
  handleCreateNew = () => {
    this.setState({
      dialog: CREATE_NEW
    })
  }
  
  getModal() {
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
    
    const xtypes = props.xtypes.map((xtype) => {
      return (
        <option key={`new-${xtype}`} value={slug(xtype)}>{xtype}</option>
      );
    });
    
    const handleClose = (event) => {
      if(event.target.matches('.modal')) {
        this.setState({
          dialog: undefined
        })
      }
    };
    
    
    if(this.state.dialog === CREATE_NEW) {
      return (
        <div className="modal" onClick={handleClose}>
          <ModalCreateNew handleClose={(event) => {
              this.setState({
                dialog: undefined
              })
            }} {...props} />
        </div>
      );
    }
    
    return undefined;
  }

  render() {
    const props = this.props;
    console.log(props);

    const {filteredSettings} = props;
    const perPage = !isNaN(props.view.perPage) ? props.view.perPage : 10;

    let rows = filteredSettings.slice((props.view.page - 1) * perPage, ((props.view.page - 1) * perPage) + perPage);

    function getAreas(setting) {
      const areas = props.areas.filter((area) => (
        area !== props.view.area
      )).map((area) => (
        <menuitem label={`${area}`} onClick={(event) => {
          console.log('updating ', setting.uuid, area);
          store.dispatch(actions.updateSetting(setting.uuid, {
            area: area
          }, props.view))
        }}></menuitem>
      ));

      return areas;
    }

    const menus = rows.map((setting) => (
      <menu type="context" id={`menu__${setting.uuid}`}>
        <menuitem label={`Update ${setting.name}`} onClick={(event) => {
          alert(`Pretend an accessible modal just opened up! Editing ${setting.name}`);
        }}></menuitem>
        <menuitem label={`Delete ${setting.name}`} onClick={(event) => {
          store.dispatch(actions.deleteSetting(setting.uuid));
        }}></menuitem>
        <menu type="context" label="Move to another area" id={`menu__${setting.uuid}__area`}>
          {getAreas(setting)}
        </menu>
      </menu>
    ))

    return (
      <BrowserRouter>
      <div className="a11y-datagrid">

        <Header aria-hidden={this.state.dialog !== undefined} {...props} handleCreateNew={this.handleCreateNew} onSearch={this.handleSearch} />
        <Pagination aria-hidden={this.state.dialog !== undefined} {...props} />


        <Route exact path='/:namespace/:area/:xtype' render={(routeProps) => (
          <DataGrid aria-hidden={this.state.dialog !== undefined} key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>
        <Route exact path='/:namespace/:area' render={(routeProps) => (
          <DataGrid aria-hidden={this.state.dialog !== undefined} key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>
        <Route exact path='/:namespace' render={(routeProps) => (
          <DataGrid aria-hidden={this.state.dialog !== undefined} key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>
        <Route exact path='/' render={(routeProps) => (
          <DataGrid aria-hidden={this.state.dialog !== undefined} key={`${routeProps.match.url}-${props.view.page}-${props.view.perPage}`} {...props} {...routeProps} search={this.state.search} />
        )}/>

        <div hidden aria-hidden={this.state.dialog !== undefined}>
          {menus}
        </div>
        {this.getModal()}
      </div>
      </BrowserRouter>
    );
  }
}
