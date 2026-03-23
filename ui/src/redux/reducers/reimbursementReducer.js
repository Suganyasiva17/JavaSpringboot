const initialState = {
  reimbursements: [],
  loading: false,
  error: null
};

export default function reimbursementReducer(state = initialState, action) {
  switch (action.type) {

    case "REIMBURSE_LOADING":
      return { ...state, loading: true };

    case "REIMBURSE_SUCCESS":
      return { ...state, loading: false, reimbursements: action.payload };

    case "REIMBURSE_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}