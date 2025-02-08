import { Component, Input } from "@angular/core";

export type TypographySegment =
	| "input"
	| "button"
	| "label"
	| "paragraph"
	| "paragraph-bold";

@Component({
	selector: "app-typography",
	imports: [],
	templateUrl: "./typography.component.html",
	styleUrl: "./typography.component.scss",
})
export class TypographyComponent {
	@Input() content = "";
	@Input() segment: TypographySegment = "paragraph";
}
