import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ErrorHandlerService } from "./services/error-handler.service";
import { StreamService } from "./services/stream.service";
import { By } from "@angular/platform-browser";
import { ButtonComponent } from "./components/button/button.component";
import { CharacterSelectorComponent } from "./components/character-selector/character-selector.component";
import { of } from "rxjs";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;
	const spies = new Array<jasmine.Spy>();

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [ErrorHandlerService, StreamService],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
	});

	afterEach(() => {
		for (const spy of spies) {
			spy.calls.reset();
		}
	});

	describe("ActionsElement", () => {
		let service: StreamService;

		beforeEach(() => {
			service = TestBed.inject(StreamService);
		});

		describe("CharacterSelectorComponent", () => {
			let characterSelectorComponent: CharacterSelectorComponent;

			beforeEach(() => {
				characterSelectorComponent = fixture.debugElement.query(
					By.directive(CharacterSelectorComponent),
				).componentInstance;
			});

			it("@subscribes updateStreamPriorityCharacter$ when the onCharacterInput event is triggered", () => {
				const spy = spyOn(service, "updateStreamPriorityCharacter$");
				spies.push(spy);
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

			beforeEach(() => {
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
				const spy = spyOn(service, "createStream$");
				spies.push(spy);

				buttonComponent.onGenerateStream.emit();
				fixture.detectChanges();
				expect(service.createStream$).toHaveBeenCalled();
			});
		});
	});

	describe("GridComponent", () => {
		let buttonComponent: ButtonComponent;
		let service: StreamService;

		beforeEach(() => {
			service = TestBed.inject(StreamService);

			buttonComponent = fixture.debugElement.query(
				By.directive(ButtonComponent),
			).componentInstance;

			const spy = spyOn(service, "createStream$").and.returnValue(
				of({ characters: { "00": "A", "01": "B" }, code: "" }),
			);

			spies.push(spy);

			buttonComponent.onGenerateStream.emit();
			fixture.detectChanges();
		});

		it("@contains grid items with predefined inputs", () => {
			expect(
				fixture.debugElement.nativeElement.querySelector("#grid--item__0")
					.textContent,
			).toEqual("A");
			expect(
				fixture.debugElement.nativeElement.querySelector("#grid--item__1")
					.textContent,
			).toEqual("B");
		});
	});

	describe("TrackerComponent", () => {
		let trackerCodeLiveElement: HTMLElement;
		let service: StreamService;
		let buttonComponent: ButtonComponent;

		beforeEach(() => {
			service = TestBed.inject(StreamService);

			trackerCodeLiveElement = fixture.debugElement.nativeElement.querySelector(
				"#tracker--code__live",
			);

			buttonComponent = fixture.debugElement.query(
				By.directive(ButtonComponent),
			).componentInstance;

			const spy = spyOn(service, "createStream$").and.returnValue(
				of({ characters: {}, code: "01" }),
			);

			spies.push(spy);

			buttonComponent.onGenerateStream.emit();

			fixture.detectChanges();
		});

		it("@contains predefined inputs", () => {
			expect(trackerCodeLiveElement.innerText).toEqual("01");
		});
	});
});
