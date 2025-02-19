import type { Router } from "express";
import { CreateStreamUseCase } from "./useCases/CreateStreamUseCase";
import { UpdateStreamPriorityCharacterUseCase } from "./useCases/UpdateStreamPriorityCharacterUseCase";
import type { BackendContext } from "./BackendApplication";

const BackendRouter = (context: BackendContext) => {
	const subscribe = (router: Router) => {
		router.get("/", async (request, response) => {
			CreateStreamUseCase(context).createStream(request, response);
		});

		router.put("/characters", async (request, response) => {
			UpdateStreamPriorityCharacterUseCase(
				context,
			).updateStreamPriorityCharacter(request, response);
		});

		return router;
	};

	return { subscribe };
};

export { BackendRouter };
