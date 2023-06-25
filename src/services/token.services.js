class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("RefreshToken");
    return user;
  }

  getLocalAccessToken() {
    const user = localStorage.getItem("AccessToken");
    return user;
  }

  updateLocalAccessToken(token, firebaseToken) {
    localStorage.setItem("AccessToken", token);
    localStorage.setItem("FirebaseToken", firebaseToken);
  }

  removeUser() {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
  }
}

export default new TokenService();