import { Component, Input } from "@angular/core";
import {
	TypographyComponent,
	type TypographySegment,
} from "../typography/typography.component";

@Component({
	selector: "app-button",
	imports: [TypographyComponent],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class ButtonComponent {
	@Input() content = "";
	@Input() segment: TypographySegment = "button";
}
