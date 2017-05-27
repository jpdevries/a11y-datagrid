export const UPDATE_VIEW = 'update_view';
export const updateView = function(view) {
  return {
    type: UPDATE_VIEW,
    view: view,
  }
}

export const DELETE_SETTING = 'delete_setting';
export const deleteSetting = function(uid) {
  return {
    type: DELETE_SETTING,
    uid: uid
  }
}
