import * as z from "zod"

export const signUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string() 
    .min(5, {
      message: "Password must be at least 5 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})/, {
      message:
        "Password must contain at least 5 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

export const signInFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters long",
      })
      .max(100)
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>
export type SignInFormType = z.infer<typeof signInFormSchema>