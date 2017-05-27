import * as actions from './actions';

const combineReducers = require('redux').combineReducers;

const faker = require('faker');

const initialNamespacesState = {
  "MODX": [
    'core'
  ],
  "Extras": [
    'ace',
    'contentblocks',
    'moregallery',
    'redactor',
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

  const settings = [];

  for(let i = 0; i < 1000; i++) {
    const name = faker.lorem.word();
    settings.push({
      name: name,
      settingKey: name.toLowerCase(),
      key: i,
      uid: i,
      value: true,
      lastModified: new Date(),
      namespace: namespaces[Math.floor(Math.random() * namespaces.length)]
    })
  }

  return settings;
})();

let settings;
function settingsReducer(state, action) {
  state = settings = state || initialSettingsState;

  switch (action.type) {
    case actions.DELETE_SETTING:
    console.log('delete setting', action);
    return state.filter((setting) => (
      setting.uid !== action.uid
    ));
    break;
  }

  return state;
}

const initialViewReducer = {
  namespace: 'core'
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

  console.log(action.type);

  switch(action.type) {
    case actions.UPDATE_VIEW:
    return settings.filter((setting) => (
      setting.namespace === action.view.namespace
    ));

    case actions.DELETE_SETTING:
    console.log('delete setting', action);
    return settings.filter((setting) => (
      setting.uid !== action.uid
    ));
  }

  return state;
}





export const CombinedReducers = combineReducers({
  settings: settingsReducer,
  namespaceSettings: namespaceSettingsReducer,
  namespaces: namespacesReducer,
  view: viewReducer
});
