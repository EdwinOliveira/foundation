import Express, { json, Router } from "express";
import { BackendRouter } from "./BackendRouter";
import cors from "cors";

import "dotenv/config";
import { GridProvider } from "./providers/GridProvider";
import { CodeProvider } from "./providers/CodeProvider";
import { RandomProvider } from "./providers/RandomProvider";

export type BackendContext = {
	gridProvider: ReturnType<typeof GridProvider>;
	codeProvider: ReturnType<typeof CodeProvider>;
	randomProvider: ReturnType<typeof RandomProvider>;
};

const BackendApplication = () => {
	const httpAddress = Number.parseInt(process.env.HTTP_ADDRESS ?? "8000");
	const httpApplication = Express();
	const context = () => ({
		gridProvider: GridProvider(),
		codeProvider: CodeProvider(),
		randomProvider: RandomProvider(),
	});

	const createMiddlewares = () => {
		httpApplication.use(json());
		httpApplication.use(cors());
	};

	const createRouter = () => {
		httpApplication.use(
			"/stream",
			BackendRouter(context()).subscribe(Router()),
		);
	};

	const createListner = () =>
		httpApplication.listen(httpAddress, () =>
			console.log(`Server initialized on PORT:${httpAddress}`),
		);

	return { createMiddlewares, createRouter, createListner };
};

const { createMiddlewares, createRouter, createListner } = BackendApplication();

createMiddlewares();
createRouter();
createListner();
