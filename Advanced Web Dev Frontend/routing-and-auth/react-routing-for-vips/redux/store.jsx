import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Initial State
const initialState = {
  user: null,
  lastVisitedPages: [],
  posts: [],
  loading: false,
  error: null,
};

// Reducer Function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, lastVisitedPages: [] };
    case "TRACK_PAGE":
      const updatedPages = [...state.lastVisitedPages, action.payload];
      if (updatedPages.length > 5) updatedPages.shift();
      return { ...state, lastVisitedPages: updatedPages };
    case "FETCH_POSTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "FETCH_POSTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Thunk to Fetch Posts
export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUEST" });

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", payload: error.message });
  }
};

// Create Store with Middleware and Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk))
);

export { rootReducer };
export default store;
