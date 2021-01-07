export const getUserInfo = state => {
  if (typeof state.userInfo === "string") {
    return JSON.parse(state.userInfo);
  }
  return state.userInfo;
};

