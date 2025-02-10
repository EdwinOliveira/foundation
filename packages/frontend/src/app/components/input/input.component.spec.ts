import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { InputComponent } from "./input.component";

describe("InputComponent", () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;
	let inputElement: HTMLInputElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InputComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		inputElement = fixture.debugElement.nativeElement.querySelector("input");
	});

	it("@outputs predefined placeholder", () => {
		component.placeholder = "Hello Dummy";
		fixture.detectChanges();

		expect(inputElement.placeholder).toBe("Hello Dummy");
	});
});
