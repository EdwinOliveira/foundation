import type { Request, Response } from "express";
import { RandomProvider } from "../providers/RandomProvider";
import { interval, map, tap } from "rxjs";

const CreateStreamUseCase = () => {
	const randomProvider = RandomProvider();

	const createStream = (request: Request, response: Response) => {
		response.status(200).set({
			"content-type": "text/event-stream",
			"cache-control": "no-cache",
			connection: "keep-alive",
		});

		const charactersStream = interval(1000)
			.pipe(
				map(() => randomProvider.createCharacters(100)),
				map((characters) => JSON.stringify(characters)),
				tap((characters) => response.write(`data: ${characters}!\n\n`)),
			)
			.subscribe();

		request.on("close", () => {
			response.end();
			charactersStream.unsubscribe();
		});
	};

	return { createStream };
};

export { CreateStreamUseCase };
