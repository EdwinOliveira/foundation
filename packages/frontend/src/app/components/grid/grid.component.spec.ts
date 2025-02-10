import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { GridComponent } from "./grid.component";

describe("GridComponent", () => {
	let component: GridComponent;
	let fixture: ComponentFixture<GridComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GridComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(GridComponent);
		component = fixture.componentInstance;
		component.characters = ["A", "B"];
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
