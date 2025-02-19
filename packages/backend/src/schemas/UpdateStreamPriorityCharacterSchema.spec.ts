import { describe, expect, it } from "vitest";
import { updateStreamPriorityCharacterSchema } from "./UpdateStreamPriorityCharacterSchema";

describe("UpdateStreamPriorityCharacterSchema", () => {
	const parseSchema = (data: Record<string, unknown>) =>
		updateStreamPriorityCharacterSchema.safeParse(data);

	it("@returns valid schema args", () => {
		expect(parseSchema({ priorityCharacter: "a" })).toEqual({
			data: { priorityCharacter: "a" },
			success: true,
		});
	});

	it("@returns schema errors because priorityCharacter is a number", () => {
		expect(parseSchema({ priorityCharacter: "1" })).containSubset({
			success: false,
		});
	});

	it("@returns schema errors because priorityCharacter has length greather than one", () => {
		expect(parseSchema({ priorityCharacter: "1" })).containSubset({
			success: false,
		});
	});

	it("@returns schema errors because priorityCharacter is a numeric value", () => {
		expect(parseSchema({ priorityCharacter: "1" })).containSubset({
			success: false,
		});
	});
});
