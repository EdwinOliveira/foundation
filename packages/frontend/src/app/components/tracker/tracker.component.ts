import { Component, Input } from "@angular/core";
import { TypographyComponent } from "../typography/typography.component";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-tracker",
	imports: [TypographyComponent, CommonModule],
	templateUrl: "./tracker.component.html",
	styleUrl: "./tracker.component.scss",
})
export class TrackerComponent {
	@Input() code: string | null = null;
}
