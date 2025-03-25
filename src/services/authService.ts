export const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("client");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };