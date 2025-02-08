import { z } from "zod";

const createStreamSchema = z.object({
	priorityCharacter: z
		.string()
		.length(1, "Property {{ priorityCharacter }} requires a {{ 1 }} length")
		.regex(/^[a-z]+$/)
		.optional(),
});

export { createStreamSchema };
