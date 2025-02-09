import { z } from "zod";

const updateStreamPriorityCharacterSchema = z.object({
	priorityCharacter: z
		.string()
		.length(1, "Property {{ priorityCharacter }} requires a {{ 1 }} length")
		.regex(/^[a-z]+$/),
});

export { updateStreamPriorityCharacterSchema };
