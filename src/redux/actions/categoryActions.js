import API from "../../utils/api";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADING" });

  try {
    const res = await API.get("/categories");
    dispatch({ type: "CATEGORY_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "CATEGORY_ERROR", payload: err.message });
  }
};