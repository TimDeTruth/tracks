import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  //get request
  const response = await trackerApi.get("/tracks");

  dispatch({ type: "fetch_tracks", payload: response.data });

  return;
};

const createTrack = (dispatch) => async (name, locations) => {
  //   console.log(name, locations.length);

  await trackerApi.post("/tracks", { name, locations });
  return;
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
