import { z } from "zod";

export const newAccountSchema = z.object({
  rootAccount: z
    .any()
    .refine((val) => val !== undefined && val !== null && val !== "", {
      message: "Conta raiz é obrigatória",
    }),
  name: z.string().min(1, "O nome é obrigatório"),
  code: z.string().min(1, "O código é obrigatório"),
});

export type FormData = z.infer<typeof newAccountSchema>;
