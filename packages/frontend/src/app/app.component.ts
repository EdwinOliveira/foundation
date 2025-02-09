import { Component, type OnInit, type OnDestroy } from "@angular/core";
import { TrackerComponent } from "./components/tracker/tracker.component";
import { GridComponent } from "./components/grid/grid.component";
import { TypographyComponent } from "./components/typography/typography.component";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { CommonModule } from "@angular/common";
// biome-ignore lint/style/useImportType: <explanation>
import { StreamService } from "./services/stream.service";
import {
	BehaviorSubject,
	debounce,
	debounceTime,
	map,
	Subject,
	Subscription,
	timer,
} from "rxjs";
import { ClockComponent } from "./components/clock/clock.component";

@Component({
	selector: "app-root",
	imports: [
		CommonModule,
		TrackerComponent,
		GridComponent,
		TypographyComponent,
		InputComponent,
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

	constructor(public readonly streamService: StreamService) {}

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
