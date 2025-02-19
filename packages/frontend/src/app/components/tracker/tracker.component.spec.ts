import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { TrackerComponent } from "./tracker.component";

describe("TrackerComponent", () => {
	let component: TrackerComponent;
	let fixture: ComponentFixture<TrackerComponent>;
	let liveCodeElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TrackerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TrackerComponent);
		component = fixture.componentInstance;
		liveCodeElement = fixture.debugElement.nativeElement.querySelector(
			"#tracker--code__live",
		);
	});

	it("@outputs predefined code", () => {
		component.code = "00";
		fixture.detectChanges();

		expect(liveCodeElement.innerText).toBe("00");
	});
});
