
const notificationReducer = (state = null, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return null
    default:
      return state;
  }
};


const showNotification = (text) => {
  return {
    type: 'SHOW',
    data: text 
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export function showNotificationWithTimeOut(text, time) {
  return function (dispatch) {
    dispatch(showNotification(text))

    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
  
}

export default notificationReducer