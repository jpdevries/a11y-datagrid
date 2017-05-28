export const UPDATE_VIEW = 'update_view';
export const updateView = function(view) {
  return {
    type: UPDATE_VIEW,
    view: view,
  }
}

export const DELETE_SETTING = 'delete_setting';
export const deleteSetting = function(uuid) {
  return {
    type: DELETE_SETTING,
    uuid: uuid
  }
}

export const DELETE_SETTINGS = 'delete_settings';
export const deleteSettings = function(uuids) {
  return {
    type: DELETE_SETTINGS,
    uuids: uuids
  }
}
