import Express, { json, Router } from "express";
import { BackendRouter } from "./BackendRouter";
import cors from "cors";

import "dotenv/config";

const BackendApplication = () => {
	const httpAddress = Number.parseInt(process.env.HTTP_ADDRESS ?? "8000");
	const httpApplication = Express();

	const createMiddlewares = () => {
		httpApplication.use(cors());
	};

	const createRouter = () => {
		httpApplication.use("/stream", BackendRouter().subscribe(Router()));
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
