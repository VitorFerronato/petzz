export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  if (!user) {
    return await navigateTo({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
