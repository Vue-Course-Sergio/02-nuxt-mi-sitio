export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/admin")) return;

  const session = await requireUserSession(event);

  const hasAdminRole = session.user.roles.includes("admin");

  if (!hasAdminRole) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "You do not have permission to access this resource.",
    });
  }

  return;
});
