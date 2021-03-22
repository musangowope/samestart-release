const SET_LANDSCAPE_MODE_ACTIVITY = 'SET_LANDSCAPE_MODE_ACTIVITY';

const setOrientationToLandscape = (nextState = false) => ({
  type: SET_LANDSCAPE_MODE_ACTIVITY,
  payload: nextState,
});
const initialState = {
  isLandscapeActive: false,
};

const screenOrientationReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case SET_LANDSCAPE_MODE_ACTIVITY:
      return {
        ...state,
        isLandscapeActive: action.payload,
      };
    default:
      return state;
  }
};

export default screenOrientationReducer;
