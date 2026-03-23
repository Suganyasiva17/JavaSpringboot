import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import categoryReducer from "./categoryReducer";
import reimbursementReducer from "./reimbursementReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  category: categoryReducer,
  reimbursement: reimbursementReducer,
  dashboard: dashboardReducer
});