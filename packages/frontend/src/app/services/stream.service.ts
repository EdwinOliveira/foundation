import { Injectable } from "@angular/core";

export type Stream = {
	characters: Record<string, string>;
	code: string;
};

@Injectable({
	providedIn: "root",
})
export class StreamService {}
