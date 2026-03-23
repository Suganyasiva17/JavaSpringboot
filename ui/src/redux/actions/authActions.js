export const setAuth = (user) => ({
  type: "SET_AUTH",
  payload: {
    user,
    role: user.role,
    employeeId: user.id
  }
});

export const logout = () => ({
  type: "LOGOUT"
});