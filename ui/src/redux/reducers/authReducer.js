// const initialState = {
//   user: { id: 1, role: "ADMIN" },
//   role: "ADMIN",
//   employeeId: 1,
// };

const initialState = {
  user: { id: 3, role: "EMPLOYEE" },
  role: "EMPLOYEE",
  employeeId: 1,
};


export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case "SET_AUTH":
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        employeeId: action.payload.employeeId
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
}