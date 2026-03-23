const initialState = {
  categories: [],
  loading: false,
  error: null
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "CATEGORY_LOADING":
      return { ...state, loading: true };

    case "CATEGORY_SUCCESS":
      return { ...state, loading: false, categories: action.payload };

    case "CATEGORY_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}