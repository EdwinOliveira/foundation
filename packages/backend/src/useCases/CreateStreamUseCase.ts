import type { Request, Response } from "express";
import { RandomProvider } from "../providers/RandomProvider";
import { interval, map } from "rxjs";

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
				map(() => {
					const stringfiedCharacters = JSON.stringify(
						randomProvider.createCharacters(100),
					);

					response.write(`data: ${stringfiedCharacters}!\n\n`);
				}),
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
