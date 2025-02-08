import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { TypographyComponent } from "./typography.component";

describe("TypographyComponent", () => {
	let component: TypographyComponent;
	let fixture: ComponentFixture<TypographyComponent>;
	let typographyInput: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TypographyComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TypographyComponent);
		component = fixture.componentInstance;
		typographyInput =
			fixture.debugElement.nativeElement.querySelector("#typography");
	});

	it("@outputs predefined content", () => {
		component.content = "Hello Dummy";
		fixture.detectChanges();

		expect(typographyInput.innerText).toBe("Hello Dummy");
	});

	it("@contains predefined classes", () => {
		component.segment = "label";
		fixture.detectChanges();

		expect(typographyInput.classList).toContain("label");
	});
});
