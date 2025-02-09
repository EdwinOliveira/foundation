import { RandomProvider } from "./RandomProvider";

const GridProvider = () => {
	const { randomCharacter, randomNumber } = RandomProvider();
	let priorityCharacter: string | undefined;

	const createPriorityCharacter = (newCharacter: string) => {
		priorityCharacter = newCharacter;
	};

	const createGrid = (size: number) => {
		const randomCharacters: Record<string, string> = {};

		if (priorityCharacter === undefined) {
			for (let i = 0; i < size; i++) {
				const position = i.toString().padStart(2, "0");
				randomCharacters[position] = randomCharacter();
			}

			return randomCharacters;
		}

		let priorityCharacterOccurrences = 0;

		for (let i = 0; i < size; i++) {
			let position = randomNumber(size).toString().padStart(2, "0");

			while (randomCharacters[position]) {
				position = randomNumber(size).toString().padStart(2, "0");
			}

			if (priorityCharacterOccurrences >= 0.2 * size) {
				randomCharacters[position] = randomCharacter(priorityCharacter);
				continue;
			}

			randomCharacters[position] = priorityCharacter;
			priorityCharacterOccurrences += 1;
		}

		return randomCharacters;
	};

	return { createPriorityCharacter, createGrid };
};

export { GridProvider };
