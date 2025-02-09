import { Component, Input } from "@angular/core";
import { TypographyComponent } from "../typography/typography.component";

@Component({
	selector: "app-tracker",
	imports: [TypographyComponent],
	templateUrl: "./tracker.component.html",
	styleUrl: "./tracker.component.scss",
})
export class TrackerComponent {
	@Input() code: string | null = null;
}
