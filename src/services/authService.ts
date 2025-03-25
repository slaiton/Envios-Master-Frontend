export const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("client");
    localStorage.removeItem("profile");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };