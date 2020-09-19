import { LOAD_MOVIES, SET_ERRORS } from "../types";

const initState = {
  movies: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      return {
        ...state,
        movieList: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
