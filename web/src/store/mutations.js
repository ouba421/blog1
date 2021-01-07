export default {
  // 設置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    sessionStorage.userInfo = JSON.stringify(userInfo);
  },
};
