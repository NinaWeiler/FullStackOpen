const notificationsAtStart = [
  "What a great message",
];


const asObject = (notification) => {
  return {
    content: notification,
  };
};

const initialState = notificationsAtStart.map(asObject);

const notificationReducer = (state = notificationsAtStart, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    default:
      return state;
  }
};


export default notificationReducer