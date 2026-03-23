const initialState = {
  employees: [],
  employee: null,
  loading: false,
  error: null
};

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {

    case "EMPLOYEE_LOADING":
      return { ...state, loading: true };

    case "EMPLOYEE_SUCCESS":
      return { ...state, loading: false, employees: action.payload };

    case "EMPLOYEE_DETAILS":
      return { ...state, loading: false, employee: action.payload };

    case "EMPLOYEE_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}