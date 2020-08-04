import axios from "axios";

export const FETCH_SMURF_DATA = "FETCH_SMURF_DATA";
export const FETCH_SMURF_PASS = "FETCH_SMURF_PASS";
export const FETCH_SMURF_FAIL = "FETCH_SMURF_FAIL";
export const POST_SMURF_DATA = "POST_SMURF_DATA";
export const POST_SMURF_PASS = "POST_SMURF_PASS";
export const POST_SMURF_FAIL = "POST_SMURF_FAIL";

export const getSmurfs = () => (dispatch) => {
  dispatch({ type: FETCH_SMURF_DATA });
  axios
    .get("http://localhost:3333/smurfs")
    .then((response) => {
      dispatch({ type: FETCH_SMURF_PASS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: FETCH_SMURF_FAIL, payload: error });
    });
};

export const postSmurf = (smurf) => (dispatch) => {
  dispatch({ type: POST_SMURF_DATA });
  axios
    .post("http://localhost:3333/smurfs", smurf)
    .then((response) => {
      dispatch({ type: POST_SMURF_PASS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: POST_SMURF_FAIL, payload: error });
    });
};

const initialState = {
  smurfs: [],
  isFetching: false,
  isUploading: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SMURF_DATA:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SMURF_PASS:
      return {
        ...state,
        smurfs: action.payload,
        isFetching: false,
      };
    case FETCH_SMURF_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case POST_SMURF_DATA:
      return {
        ...state,
        smurfs: [...state.smurfs],
        isUploading: true,
      };
    case POST_SMURF_PASS:
      return {
        ...state,
        smurfs: action.payload,
        isUploading: false,
      };
    case POST_SMURF_FAIL:
      return {
        ...state,
        isUploading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
