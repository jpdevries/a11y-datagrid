import * as actions from './actions';

const combineReducers = require('redux').combineReducers;

const faker = require('faker');

const initialNamespacesState = {
  "MODX": [
    'core'
  ],
  "Extras": [
    'redactor'
  ]
};

function namespacesReducer(state, action) {
  state = state || initialNamespacesState;

  return state;
}

const initialSettingsState = (() => {
  const namespaces = (() => {
    let ns = [];
    Object.keys(initialNamespacesState).map((key) => {
      ns = [...initialNamespacesState[key], ...ns]
    })
    return ns;
  })();

  console.log('namespaces', namespaces);

  let settings = require('./dummy.json').map((setting) => (
    Object.assign({
      name: setting.key,
      uuid: setting.key
    }, setting)
  ));

  console.log(settings);

  /*for(let i = 0; i < 1000; i++) {
    const name = faker.lorem.word();
    settings.push({
      name: name,
      uuid: name.toLowerCase(),
      key: i,
      uuid: i,
      value: true,
      lastModified: new Date(),
      namespace: namespaces[Math.floor(Math.random() * namespaces.length)]
    })
  }
  */

  return settings;
})();

let settings;
function settingsReducer(state, action) {
  state = settings = state || initialSettingsState;

  switch (action.type) {
    case actions.DELETE_SETTING:
    console.log('delete setting', action);
    return state.filter((setting) => (
      setting.uuid !== action.uuid
    ));
    break;
  }

  return state;
}

const initialViewReducer = {
  namespace: 'core',
  area: undefined,
  checkedSettings: []
};

function viewReducer(state, action) {
  state = state || initialViewReducer;

  switch(action.type) {
    case actions.UPDATE_VIEW:
    return Object.assign({},state,action.view);
  }

  return state;
}



const initialNamespaceSettings = initialSettingsState.filter((setting) => (
  setting.namespace === initialViewReducer.namespace
));

function namespaceSettingsReducer(state, action) {
  state = state || initialNamespaceSettings;

  let r = state;
  console.log(action);

  switch(action.type) {
    case actions.UPDATE_VIEW:
    if(action.view.namespace) {
      return settings.filter((setting) => (
        setting.namespace === action.view.namespace
      ));
    }

    if(action.view.area) {
      return settings.filter((setting) => (
        setting.area === action.view.area
      ));
    }

    if(action.view.xtype) {
      return settings.filter((setting) => (
        setting.xtype === action.view.xtype
      ));
    }


    case actions.DELETE_SETTING:
    console.log('delete setting', action);
    return settings.filter((setting) => (
      setting.uuid !== action.uuid
    ));

  }

  return state;
}

const initialAreasState = (() => {
  let areas = require('./dummy.json').map((setting) => (
    setting.area
  ));
  return [...new Set(areas)];
})();

function areasReducer(state, action) {
  state = state || initialAreasState;

  return state;
}

const initialXtypesState = (() => {
  let xtypes = require('./dummy.json').map((setting) => (
    setting.xtype
  ));
  return [...new Set(xtypes)];
})();

function xtypesReducer(state, action) {
  state = state || initialXtypesState;

  return state;
}


export const CombinedReducers = combineReducers({
  settings: settingsReducer,
  namespaceSettings: namespaceSettingsReducer,
  namespaces: namespacesReducer,
  areas: areasReducer,
  view: viewReducer,
  xtypes: xtypesReducer
});
