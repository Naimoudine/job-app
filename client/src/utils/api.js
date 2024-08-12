export async function checkAuth() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/verify-auth`,
      {
        credentials: "include",
      }
    );
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
