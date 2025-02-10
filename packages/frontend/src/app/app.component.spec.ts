import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ErrorHandlerService } from "./services/error-handler.service";
import { StreamService } from "./services/stream.service";
import { By } from "@angular/platform-browser";
import { TrackerComponent } from "./components/tracker/tracker.component";
import { GridComponent } from "./components/grid/grid.component";
import { ButtonComponent } from "./components/button/button.component";
import { CharacterSelectorComponent } from "./components/character-selector/character-selector.component";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [ErrorHandlerService, StreamService],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
	});

	describe("ErrorElement", () => {
		let service: ErrorHandlerService;
		let errorElement: HTMLElement;

		beforeEach(() => {
			service = TestBed.inject(ErrorHandlerService);
			service.error$.next("Hello Dummy Error");
			errorElement = fixture.debugElement.nativeElement.querySelector("#error");
			fixture.detectChanges();
		});

		afterEach(() => {
			service.error$.unsubscribe();
		});

		it("@outputs element that notify there was an error triggered somewhere within the app", () => {
			expect(errorElement.innerText).toBe("Hello Dummy Error");
		});
	});

	describe("ActionsElement", () => {
		describe("CharacterSelectorComponent", () => {
			let characterSelectorComponent: CharacterSelectorComponent;
			let service: StreamService;

			beforeEach(() => {
				service = TestBed.inject(StreamService);

				characterSelectorComponent = fixture.debugElement.query(
					By.directive(CharacterSelectorComponent),
				).componentInstance;
			});

			it("@subscribes updateStreamPriorityCharacter$ when the onCharacterInput event is triggered", () => {
				spyOn(service, "updateStreamPriorityCharacter$");
				characterSelectorComponent.onCharacterInput.emit("A");
				fixture.detectChanges();
				expect(service.updateStreamPriorityCharacter$).toHaveBeenCalledWith(
					"A",
				);
			});
		});

		describe("ButtonComponent", () => {
			let buttonComponent: ButtonComponent;
			let buttonElement: HTMLElement;
			let service: StreamService;

			beforeEach(() => {
				service = TestBed.inject(StreamService);

				buttonComponent = fixture.debugElement.query(
					By.directive(ButtonComponent),
				).componentInstance;

				buttonElement =
					fixture.debugElement.nativeElement.querySelector("#button");
			});

			it("@outputs predefined content", () => {
				fixture.detectChanges();
				expect(buttonElement.innerText).toBe("GENERATE 2D GRID");
			});

			it("@subscribes createStream$ when the onGenerateStream event is triggered", () => {
				spyOn(service, "createStream$");
				buttonComponent.onGenerateStream.emit();
				fixture.detectChanges();
				expect(service.createStream$).toHaveBeenCalled();
			});
		});
	});

	describe("GridComponent", () => {
		let gridComponent: GridComponent;

		beforeEach(() => {
			gridComponent = fixture.debugElement.query(
				By.directive(GridComponent),
			).componentInstance;

			gridComponent.characters = ["A", "B"];
			fixture.detectChanges();
		});

		it("@contains grid items with predefined inputs", () => {
			expect(
				fixture.debugElement.nativeElement.querySelector("#grid--item__0")
					.innerText,
			).toEqual("A");
			expect(
				fixture.debugElement.nativeElement.querySelector("#grid--item__1")
					.innerText,
			).toEqual("B");
		});
	});

	describe("TrackerComponent", () => {
		let trackerComponent: TrackerComponent;
		let trackerCodeLiveElement: HTMLElement;

		beforeEach(() => {
			trackerComponent = fixture.debugElement.query(
				By.directive(TrackerComponent),
			).componentInstance;

			trackerCodeLiveElement = fixture.debugElement.nativeElement.querySelector(
				"#tracker--code__live",
			);

			trackerComponent.code = "00";
			fixture.detectChanges();
		});

		it("@contains predefined inputs", () => {
			expect(trackerCodeLiveElement.innerText).toEqual("00");
		});
	});
});
