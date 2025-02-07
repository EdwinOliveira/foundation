import Express, { Router } from "express";

import "dotenv/config";
import { BackendRouter } from "./BackendRouter";

const BackendApplication = () => {
	const httpAddress = Number.parseInt(process.env.HTTP_ADDRESS ?? "8000");
	const httpApplication = Express();

	const createRouter = () => {
		httpApplication.use("/stream", BackendRouter().subscribe(Router()));
	};

	const createListner = () =>
		httpApplication.listen(httpAddress, () =>
			console.log(`Server initialized on PORT:${httpAddress}`),
		);

	return { createRouter, createListner };
};

const { createRouter, createListner } = BackendApplication();

createRouter();
createListner();
