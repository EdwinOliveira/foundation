import { describe, expect, it, vi } from "vitest";
import { RandomProvider } from "./RandomProvider";

describe("RandomProvider", () => {
	const { randomNumber, randomCharacter } = RandomProvider();

	describe("randomCharacter", () => {
		const callRandomCharacter = (ignoredCharacter?: string) =>
			randomCharacter(ignoredCharacter);

		const ignoredCharacter = "z";

		it("@returns random character", () => {
			expect(callRandomCharacter()).match(/^[a-z]+$/);
		});

		it("@returns random character other than ignored character", () => {
			expect(callRandomCharacter(ignoredCharacter)).not.toBe(ignoredCharacter);
		});
	});

	describe("randomNumber", () => {
		const callRandomNumber = (length: number) => randomNumber(length);
		const predefinedLength = 100;

		it("@returns random integer number", () => {
			expect(Number.isInteger(callRandomNumber(predefinedLength))).toBeTruthy();
		});

		it("@returns random integer number contained within a predefined length", () => {
			expect(callRandomNumber(predefinedLength)).toBeLessThan(predefinedLength);
		});
	});
});
