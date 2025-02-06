import { createServer } from "node:http";
import Express from "express";
import { Server } from "socket.io";

import "dotenv/config";

const BackendApplication = () => {
	const httpAddress = Number.parseInt(process.env.HTTP_ADDRESS ?? "8000");
	const httpApplication = Express();
	const httpServer = createServer(httpApplication);
	const httpSocket = new Server(httpServer);

	const createSocket = () => {
		httpSocket.on("connection", () => {});
	};

	const createListner = () =>
		httpApplication.listen(httpAddress, () =>
			console.log(`Server initialized on PORT:${httpAddress}`),
		);

	return { createSocket, createListner };
};

const { createSocket, createListner } = BackendApplication();

createSocket();
createListner();
