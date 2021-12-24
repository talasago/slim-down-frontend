function logout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("sub");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userBelongCommunityId");
    window.location.href = "./login.html";
};
