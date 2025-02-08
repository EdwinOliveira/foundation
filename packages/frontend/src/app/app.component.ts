import { Component } from "@angular/core";
import { TypographyComponent } from "./components/typography/typography.component";
import { ButtonComponent } from "./components/button/button.component";
import { InputComponent } from "./components/input/input.component";

@Component({
	selector: "app-root",
	imports: [TypographyComponent, ButtonComponent, InputComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {}
