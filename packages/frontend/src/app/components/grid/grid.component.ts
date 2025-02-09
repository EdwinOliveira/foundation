import {
	Component,
	Input,
	type OnChanges,
	type SimpleChanges,
} from "@angular/core";

@Component({
	selector: "app-grid",
	imports: [],
	templateUrl: "./grid.component.html",
	styleUrl: "./grid.component.scss",
})
export class GridComponent implements OnChanges {
	@Input() characters: Array<string> | null = null;

	ngOnChanges(changes: SimpleChanges): void {
		this.characters = changes["characters"].currentValue;
	}
}
