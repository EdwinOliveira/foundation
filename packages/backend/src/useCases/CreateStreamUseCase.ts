import type { Request, Response } from "express";
import { RandomProvider } from "../providers/RandomProvider";

const CreateStreamUseCase = () => {
	const { createCharacters, createCode } = RandomProvider();

	const createStream = (request: Request, response: Response) => {
		response.status(200).set({
			"content-type": "text/event-stream",
			"cache-control": "no-cache",
			connection: "keep-alive",
		});

		setInterval(() => {
			const characters = createCharacters(100);
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
