import { afterAll, describe, expect, it, vi } from "vitest";
import { GridProvider } from "./GridProvider";

const randomCharacterMock = vi.fn();
const randomNumberMock = vi.fn();

vi.mock("./RandomProvider", () => ({
	RandomProvider: () => ({
		randomCharacter: randomCharacterMock,
		randomNumber: randomNumberMock,
	}),
}));

describe("GridProvider", () => {
	const { createGrid, createPriorityCharacter } = GridProvider();

	afterAll(() => {
		vi.clearAllMocks();
	});

	describe("createGrid", () => {
		const callCreateGrid = () => createGrid(3);

		it("@returns grid with random characters without a priority character", () => {
			randomCharacterMock.mockReturnValue("A");
			expect(callCreateGrid()).toEqual({ "00": "A", "01": "A", "02": "A" });
		});

		it("@returns grid with random characters with twenty percent of them matching a priority character", () => {
			createPriorityCharacter("X");

			randomNumberMock
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(1)
				.mockReturnValueOnce(2);

			randomCharacterMock.mockReturnValue("A");

			expect(callCreateGrid()).toEqual({ "00": "X", "01": "A", "02": "A" });
		});
	});
});
