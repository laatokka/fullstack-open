
const notificationReducer = (state = { notification: null, notify: null }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':

      if (state.notify !== null) {
        clearTimeout(state.notify)
      }

      return { notification: action.notification.notification, notify: action.notification.notify }
    case 'SET_NOTIFICATION_OFF':
      return { notification: null, notify: null }
    default:
      return state
  }
}

export const setNotification = (notification, time) => {

  return async dispatch => {

    const notify = setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION_OFF' })
    }, time * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { notification, notify }
    })
  }
}

export default notificationReducer