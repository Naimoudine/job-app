export const checkAuth = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/verify-auth`,
      {
        credentials: "include",
      }
    );
    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};
