import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ErrorHandlerService } from "./error-handler.service";

export type Stream = {
	characters: Record<string, string>;
	code: string;
};

@Injectable({
	providedIn: "root",
})
export class StreamService {
	readonly #errorHandlerService = inject(ErrorHandlerService);
	readonly #rootURL = "http://localhost:8000";

	createStream$() {
		return new Observable<Stream>((observer) => {
			const stream = new EventSource(`${this.#rootURL}/stream`);
			stream.onmessage = (event) => observer.next(JSON.parse(event.data));
			stream.onerror = () => {
				stream.close();
				this.#errorHandlerService.error$.next(
					"Event stream on the {{ StreamService }} got closed unexpectedly! This is probably an error with the server sending the data.",
				);
			};
		});
	}

	updateStreamPriorityCharacter$(character: string) {
		return new Observable(() => {
			fetch(`${this.#rootURL}/stream/characters`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ priorityCharacter: character }),
			}).catch((error) => {
				this.#errorHandlerService.error$.next(
					`Something went wrong with the {{ updateStreamPriorityCharacter }} on the {{ StreamService }}. Error:{{ ${error} }}`,
				);
			});
		});
	}
}
