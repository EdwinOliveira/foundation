import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TypographyComponent } from "../typography/typography.component";
import { InputComponent } from "../input/input.component";

@Component({
	selector: "app-character-selector",
	imports: [TypographyComponent, InputComponent],
	templateUrl: "./character-selector.component.html",
	styleUrl: "./character-selector.component.scss",
})
export class CharacterSelectorComponent {
	@Input() typographyContent = "CHARACTER";
	@Input() inputPlaceholder = "Character";
	@Output() onCharacterInput = new EventEmitter<string>();
}
