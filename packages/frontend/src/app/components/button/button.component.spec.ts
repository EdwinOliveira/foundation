import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";
import { TypographyComponent } from "../typography/typography.component";
import { By } from "@angular/platform-browser";

describe("ButtonComponent", () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
	});

	describe("TypographyComponent", () => {
		let typographyComponent: TypographyComponent;

		beforeEach(() => {
			typographyComponent = fixture.debugElement.query(
				By.directive(TypographyComponent),
			).componentInstance;

			component.content = "Hello Dummy";
			component.segment = "button";
			fixture.detectChanges();
		});

		it("@contains predefined inputs", () => {
			expect(typographyComponent.content).toEqual("Hello Dummy");
			expect(typographyComponent.segment).toEqual("button");
		});
	});
});
