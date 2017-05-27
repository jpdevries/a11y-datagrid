import React, { Component } from 'react';

import store from './model/store';
import actions from './model/actions';

import logo from './logo.svg';
import SettingsGrid from './SettingsGrid';



import { createStore } from 'redux';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);

    store.subscribe(() => {
      const state = store.getState();
      console.log(state);
    });
  }
  componentWillMount() {
    this.SettingsController = connect(function(state, props) { // todo list
        return {
          settings: state.settings,
          namespaces: state.namespaces,
          view: state.view,
          filteredSettings: state.namespaceSettings,
          areas: state.areas,
          xtypes: state.xtypes
        }
    })((SettingsGrid)); // shoot it up with some i18n
  }

  render(props) {

    return (
      <Provider store={store}>
        <this.SettingsController {...props} />
      </Provider>
    );
  }
}

export default App;
