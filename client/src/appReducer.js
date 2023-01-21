const INITIAL_STATE = {
  prompt: "",
  size: "medium",
  spinner: false,
  message: "Image will be displayed here",
  image: ""
};

const ACTION_TYPE = {
  SET_PROMPT: "SET_PROMPT",
  SET_SIZE: "SET_SIZE",
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE"
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PROMPT:
      return { ...state, prompt: action.payload };
    case ACTION_TYPE.SET_SIZE:
      return { ...state, size: action.payload };
    case ACTION_TYPE.FETCH_START:
      return {
        ...state,
        spinner: true,
        prompt: "",
        message: "Generating Image...",
        image: ""
      };
    case ACTION_TYPE.FETCH_SUCCESS:
      return {
        ...state,
        spinner: false,
        message: "",
        image: action.payload
      };
    case ACTION_TYPE.FETCH_FAILURE:
      return {
        ...state,
        spinner: false,
        message: action.payload,
        image: ""
      };
    default:
      return state;
  }
};

export { INITIAL_STATE, ACTION_TYPE, appReducer };
