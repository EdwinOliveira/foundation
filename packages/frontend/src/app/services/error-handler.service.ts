import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ErrorHandlerService {
	readonly error$ = new Subject<string>();
}
