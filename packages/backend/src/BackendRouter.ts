import type { Router } from "express";
import { CreateStreamUseCase } from "./useCases/CreateStreamUseCase";

const BackendRouter = () => {
	const subscribe = (router: Router) => {
		router.get("/", async (request, response) => {
			CreateStreamUseCase().createStream(request, response);
		});

		return router;
	};

	return { subscribe };
};

export { BackendRouter };
