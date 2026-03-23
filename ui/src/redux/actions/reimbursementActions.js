import API from "../../utils/api";

export const fetchAllReimbursements = () => async (dispatch) => {
  dispatch({ type: "REIMBURSE_LOADING" });

  try {
    const res = await API.get("/reimbursement");
    dispatch({ type: "REIMBURSE_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "REIMBURSE_ERROR", payload: err.message });
  }
};