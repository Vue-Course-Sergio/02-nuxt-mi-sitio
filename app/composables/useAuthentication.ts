export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {
    try {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      await fetch();
      navigateTo("/?message=Login successful");

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (
    fullname: string,
    email: string,
    password: string
  ) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: { fullname, email, password },
      });

      await fetch();
      navigateTo("/?message=Registration successful");

      return true;
    } catch (error) {}
  };

  const logout = async () => {
    await clear();
    navigateTo("/?message=Logout successful");
  };

  return {
    loggedIn,
    session,
    user,
    isLoggedIn: loggedIn,
    isAdmin: computed(() => user.value?.roles.includes("admin")),
    fetch,
    login,
    register,
    logout,
  };
};
