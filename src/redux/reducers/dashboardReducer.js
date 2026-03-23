const initialState = {
  summary: null,
  loading: false,
  error: null,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case "DASHBOARD_LOADING":
      return { ...state, loading: true };

    case "DASHBOARD_SUCCESS":
      return { ...state, loading: false, summary: action.payload };

    case "DASHBOARD_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}