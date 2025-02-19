import type { Request, Response } from "express";
import type { BackendContext } from "../BackendApplication";

const CreateStreamUseCase = ({
	codeProvider,
	gridProvider,
}: BackendContext) => {
	const createStream = (request: Request, response: Response) => {
		response.status(200).set({
			"content-type": "text/event-stream",
			"cache-control": "no-cache",
			connection: "keep-alive",
		});

		const interval = setInterval(() => {
			const characters = gridProvider.createGrid(100);
			const code = codeProvider.createCode(characters);
			response.write(`data: ${JSON.stringify({ characters, code })}\n\n`);
		}, 2000);

		request.on("close", () => {
			clearInterval(interval);
			response.end();
		});
	};

	return { createStream };
};

export { CreateStreamUseCase };
