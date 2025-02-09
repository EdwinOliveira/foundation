import {
	Component,
	EventEmitter,
	Input,
	type OnDestroy,
	type OnInit,
	Output,
} from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
	concatMap,
	delay,
	distinctUntilChanged,
	filter,
	of,
	Subject,
	Subscription,
	switchMap,
	throttleTime,
} from "rxjs";

@Component({
	selector: "app-input",
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./input.component.html",
	styleUrl: "./input.component.scss",
})
export class InputComponent implements OnInit, OnDestroy {
	@Input() placeholder = "";
	@Output() onCharacterInput = new EventEmitter<string>();

	isDisabled = false;

	character = "";
	characterSubject = new Subject<string>();

	ngOnInit() {
		this.characterSubject
			.pipe(
				filter((character) => !!character),
				throttleTime(4000),
				distinctUntilChanged(),
				concatMap((character) => {
					this.isDisabled = true;
					this.onCharacterInput.emit(character);
					return of(character).pipe(delay(4000));
				}),
			)
			.subscribe(() => {
				console.log("hello");
				this.isDisabled = false;
			});
	}

	onCharacterTyping() {
		this.characterSubject.next(this.character);
	}

	ngOnDestroy() {
		this.characterSubject.unsubscribe();
	}
}
