import type { Request, Response } from "express";
import { RandomProvider } from "../providers/RandomProvider";
import { createStreamSchema } from "../schemas/CreateStreamSchema";

const CreateStreamUseCase = () => {
	const { createCharacters, createCode } = RandomProvider();

	const createStream = (request: Request, response: Response) => {
		const { data: schemaArgs, error: schemaError } =
			createStreamSchema.safeParse(request.query);

		if (schemaError) {
			return response.status(400).json(schemaError);
		}

		response.status(200).set({
			"content-type": "text/event-stream",
			"cache-control": "no-cache",
			connection: "keep-alive",
		});

		setInterval(() => {
			const characters = createCharacters(100, schemaArgs.priorityCharacter);
			const code = createCode(characters);
			response.write(`data: ${JSON.stringify({ characters, code })}!\n\n`);
		}, 2000);

		request.on("close", () => {
			response.end();
		});
	};

	return { createStream };
};

export { CreateStreamUseCase };
