import type { Request, Response } from "express";
import { updateStreamPriorityCharacterSchema } from "../schemas/UpdateStreamPriorityCharacterSchema";
import type { BackendContext } from "../BackendApplication";

const UpdateStreamPriorityCharacterUseCase = (context: BackendContext) => {
	const updateStreamPriorityCharacter = (
		request: Request,
		response: Response,
	) => {
		const { data: schemaArgs, error: schemaError } =
			updateStreamPriorityCharacterSchema.safeParse(request.body);

		if (schemaError) {
			return response.status(400).json(schemaError);
		}

		context.gridProvider.setPriorityCharacter(schemaArgs.priorityCharacter);

		return response.status(201).json();
	};

	return { updateStreamPriorityCharacter };
};

export { UpdateStreamPriorityCharacterUseCase };
