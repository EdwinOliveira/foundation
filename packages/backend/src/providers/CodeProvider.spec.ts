import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CodeProvider } from "./CodeProvider";

const mockDate = (seconds: string) => {
	vi.spyOn(globalThis, "Date").mockImplementationOnce(() => {
		return {
			getSeconds: () => Number.parseInt(seconds),
		} as Date;
	});
};

describe("CodeProvider", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const callCreateCode = (characters: Record<string, string>) =>
		CodeProvider().createCode(characters);

	it("@returns {{ 00 }} in case there are no characters", () => {
		expect(callCreateCode({})).toBe("00");
	});

	it("@returns {{ 11 }} when there is only one occurence of the character matching the seconds", () => {
		mockDate("25");
		expect(callCreateCode({ "25": "B", "52": "C" })).toBe("11");
	});
});
