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

    case actions.DELETE_SETTINGS:
    return state.filter((setting) => (
      !(action.uuids.indexOf(setting.uuid) > -1)
    ));
    break;

  }

  return state;
}

const initialViewReducer = {
  namespace: 'core',
  area: undefined,
  perPage: 42,
  page: 1,
  checkedSettings: []
};

let view;
function viewReducer(state, action) {
  state = view = state || initialViewReducer;

  switch(action.type) {
    case actions.UPDATE_VIEW:
    state = Object.assign({},state,action.view);
    break;

    case actions.DELETE_SETTINGS:
    console.log('DELETE_SETTINGS');
    console.log(action.uuids, checkedSettings);
    const checkedSettings = state.checkedSettings;
    state = Object.assign({}, state, {
      checkedSettings: checkedSettings.filter((uuid) => (
        !(action.uuids.indexOf(uuid) > -1)
      ))
    });
    break;
  }

  view = state;
  return state;
}



const initialNamespaceSettings = initialSettingsState.filter((setting) => (
  setting.namespace === initialViewReducer.namespace
));

function namespaceSettingsReducer(state, action) {
  state = settings;

  let r = state;
  console.log(action);
  console.log(view);

  switch(action.type) {
    case actions.UPDATE_VIEW:
    console.log('UPDATE_VIEW');
    console.log(view);
    if(action.view.namespace) {
      console.log('updating namespace');
      r = r.filter((setting) => (
        setting.namespace === (action.view.namespace)
      ));
      console.log(r);
    }

    if(action.view.area) {
      console.log('filtering on area', (action.view.area))
      r = r.filter((setting) => (
        setting.area === (action.view.area)
      ));
    }

    if(action.view.xtype) {
      r = r.filter((setting) => (
        setting.xtype === (action.view.xtype)
      ));
    }
    break;


    case actions.DELETE_SETTING:
    console.log('delete setting', action);
    r = r.filter((setting) => (
      setting.uuid !== action.uuid
    ));
    break;

    case actions.DELETE_SETTINGS:
    console.log('DELETE_SETTINGS');
    r = settings.filter((setting) => {
      return !(action.uuids.indexOf(setting.uuid) > -1);
    });
    break;

  }

  return r;
}

const initialAreasState = (() => {
  let areas = require('./dummy.json').map((setting) => (
    setting.area
  )).sort((a,b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
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
