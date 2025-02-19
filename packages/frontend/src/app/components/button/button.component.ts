import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
	TypographyComponent,
	type TypographySegment,
} from "../typography/typography.component";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-button",
	imports: [TypographyComponent, CommonModule],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class ButtonComponent {
	@Input() content = "";
	@Input() segment: TypographySegment = "button";
	@Output() onGenerateStream = new EventEmitter<void>();

	createStream() {
		this.onGenerateStream.emit();
	}
}
