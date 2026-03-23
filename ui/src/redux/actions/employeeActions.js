import API from "../../utils/api";

export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: "EMPLOYEE_LOADING" });
  try {
    const res = await API.get("/employee");
    dispatch({ type: "EMPLOYEE_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "EMPLOYEE_ERROR", payload: err.message });
  }
};

export const fetchEmployeeById = (id) => async (dispatch) => {
  dispatch({ type: "EMPLOYEE_LOADING" });
  try {
    const res = await API.get(`/employee/${id}`);
    dispatch({ type: "EMPLOYEE_DETAILS", payload: res.data });
  } catch (err) {
    dispatch({ type: "EMPLOYEE_ERROR", payload: err.message });
  }
};