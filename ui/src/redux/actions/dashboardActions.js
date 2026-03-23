import API from "../../utils/api";

export const fetchAdminDashboard = () => async (dispatch) => {
  dispatch({ type: "DASHBOARD_LOADING" });

  try {
    const res = await API.get("/dashboard");
    dispatch({ type: "DASHBOARD_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "DASHBOARD_ERROR", payload: err.message });
  }
};

export const fetchEmployeeDashboard = (id) => async (dispatch) => {
  dispatch({ type: "DASHBOARD_LOADING" });

  try {
    const res = await API.get(`/dashboard/${id}`);
    dispatch({ type: "DASHBOARD_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "DASHBOARD_ERROR", payload: err.message });
  }
};