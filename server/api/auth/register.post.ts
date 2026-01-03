import { z } from "zod";
import bcrypt from "bcryptjs";

const bodySchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Email is not valid",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default defineEventHandler(async (event) => {
  const { fullname, email, password } = await readValidatedBody(
    event,
    bodySchema.parse
  );

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: "Email is already registered",
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: fullname,
      email,
      password: hashedPassword,
      roles: ["user"],
    },
  });

  const userSession = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    roles: newUser.roles,
  };

  await setUserSession(event, {
    user: userSession,
    loggedInAt: new Date(),
  });

  return {
    message: "Registration successful",
    user: userSession,
  };
});
