import Express from "express";

import "dotenv/config";

const BackendApplication = () => {
	const httpAddress = Number.parseInt(process.env.HTTP_ADDRESS ?? "8000");
	const httpApplication = Express();

	const createListner = () =>
		httpApplication.listen(httpAddress, () =>
			console.log(`Server initialized on PORT:${httpAddress}`),
		);

	return { createListner };
};

const { createListner } = BackendApplication();

createListner();
