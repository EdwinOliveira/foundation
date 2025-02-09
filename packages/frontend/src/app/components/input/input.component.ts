import {
	Component,
	EventEmitter,
	Input,
	type OnDestroy,
	type OnInit,
	Output,
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { distinctUntilChanged, Subscription, throttleTime } from "rxjs";

@Component({
	selector: "app-input",
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./input.component.html",
	styleUrl: "./input.component.scss",
})
export class InputComponent implements OnInit, OnDestroy {
	@Input() placeholder = "";
	@Output() onCharacterInput = new EventEmitter<string>();

	character = new FormControl();
	character$ = new Subscription();

	ngOnInit() {
		this.character.disable;
		this.character$ = this.character.valueChanges
			.pipe(throttleTime(4000), distinctUntilChanged())
			.subscribe((character) => {
				this.onCharacterInput.emit(character);
			});
	}

	ngOnDestroy(): void {
		this.character$.unsubscribe();
	}
}
