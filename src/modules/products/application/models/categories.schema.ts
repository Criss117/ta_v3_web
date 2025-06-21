import { z } from "zod";

export const categoryFormDto = z.object({
	name: z
		.string({
			required_error: "El nombre es requerido",
		})
		.min(5, { message: "El nombre debe tener al menos 5 caracteres" })
		.max(100, { message: "El nombre no puede tener más de 100 caracteres" }),
	description: z
		.string()
		.max(225, {
			message: "La descripción no puede tener más de 225 caracteres",
		})
		.nullish(),
});

export type CategoryFormDto = z.infer<typeof categoryFormDto>;
