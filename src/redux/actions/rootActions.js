import axios from "axios";
import { LOAD_MOVIES, SET_ERRORS } from "../types";
import config from "../../config";

export const getMovies = () => (dispatch) => {
    dispatch({ type: LOAD_MOVIES });
  axios
    .get(config.MovieAPI)
    .then((res) => {
      dispatch({
        type: LOAD_MOVIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      });
    });
};
