import { z } from "zod";

export const newAccountSchema = z.object({
  rootAccount: z
    .any()
    .refine((val) => val !== undefined && val !== null && val !== "", {
      message: "Root Account is required",
    }),
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  type: z.string().min(1, "Type is required"),
});

export type FormData = z.infer<typeof newAccountSchema>;
