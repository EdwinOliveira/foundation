import { Component, type OnInit, type OnDestroy } from "@angular/core";
import { TrackerComponent } from "./components/tracker/tracker.component";
import { GridComponent } from "./components/grid/grid.component";
import { ButtonComponent } from "./components/button/button.component";
import { CommonModule } from "@angular/common";
// biome-ignore lint/style/useImportType: <explanation>
import { StreamService } from "./services/stream.service";
// biome-ignore lint/style/useImportType: <explanation>
import { ErrorHandlerService } from "./services/error-handler.service";
import { BehaviorSubject, debounceTime, Subscription } from "rxjs";
import { ClockComponent } from "./components/clock/clock.component";
import { CharacterSelectorComponent } from "./components/character-selector/character-selector.component";

@Component({
	selector: "app-root",
	imports: [
		CommonModule,
		TrackerComponent,
		GridComponent,
		CharacterSelectorComponent,
		ButtonComponent,
		ClockComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnDestroy {
	private streamSubscription = new Subscription();
	private streamPrioritySubscription = new Subscription();
	public characters$ = new BehaviorSubject<Array<string>>(new Array(100));
	public code$ = new BehaviorSubject<string>("00");

	constructor(
		public readonly streamService: StreamService,
		public readonly errorHandlerService: ErrorHandlerService,
	) {}

	generateCharacters() {
		this.streamSubscription = this.streamService
			.createStream$()
			.subscribe((data) => {
				this.characters$.next(Array.from(Object.values(data.characters)));
				this.code$.next(data.code);
			});
	}

	updateStreamPriorityCharacter(character: string) {
		this.streamPrioritySubscription = this.streamService
			.updateStreamPriorityCharacter(character)
			.pipe(debounceTime(5000))
			.subscribe();
	}

	ngOnDestroy(): void {
		this.streamSubscription.unsubscribe();
		this.streamPrioritySubscription.unsubscribe();
	}
}
