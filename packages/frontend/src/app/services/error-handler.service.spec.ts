import { TestBed } from "@angular/core/testing";

import { ErrorHandlerService } from "./error-handler.service";

describe("ErrorHandlerService", () => {
	let service: ErrorHandlerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ErrorHandlerService);
	});

	afterEach(() => {
		service.error$.unsubscribe();
	});

	it("@provides state that displays when an error occurred if the error is correctly handled", () => {
		service.error$.subscribe((error) =>
			expect(error).toBe("Hello Dummy Error"),
		);

		service.error$.next("Hello Dummy Error");
	});
});
