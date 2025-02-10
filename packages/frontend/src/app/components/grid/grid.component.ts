import { Component, Input } from "@angular/core";

@Component({
	selector: "app-grid",
	imports: [],
	templateUrl: "./grid.component.html",
	styleUrl: "./grid.component.scss",
})
export class GridComponent {
	@Input() characters: Array<string> = [];

	createGridItemId(index: number) {
		return `grid--item__${index}`;
	}
}
