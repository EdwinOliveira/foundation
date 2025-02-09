import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export type Stream = {
	characters: Record<string, string>;
	code: string;
};

@Injectable({
	providedIn: "root",
})
export class StreamService {
	readonly #rootURL = "http://localhost:8000";

	createStream$() {
		return new Observable<Stream>((observer) => {
			const stream = new EventSource(`${this.#rootURL}/stream`);
			stream.onmessage = (event) => observer.next(JSON.parse(event.data));
			stream.onerror = () => stream.close();
		});
	}

	updateStreamWeightCharacter(character: string) {
		return new Observable<Stream>(() => {
			fetch(`${this.#rootURL}/weight`, {
				method: "POST",
				body: JSON.stringify({ character }),
			});
		});
	}
}
