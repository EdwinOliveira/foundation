const RandomProvider = () => {
	return {
		createCharacters: (size: number, priorityCharacter?: string) => {
			const randomCharacter = (priorityCharacter?: string) => {
				const characters = "abcdefghijklmnopqrstuvyxz";

				const sanitizedCharacters = priorityCharacter
					? characters.replace(priorityCharacter, "")
					: characters;

				return sanitizedCharacters.charAt(
					randomNumber(sanitizedCharacters.length),
				);
			};

			const randomNumber = (lenth: number) => {
				return Math.floor(Math.random() * lenth);
			};

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
				let position = randomNumber(100).toString().padStart(2, "0");

				while (randomCharacters[position]) {
					position = randomNumber(100).toString().padStart(2, "0");
				}

				if (priorityCharacterOccurrences >= 0.2 * size) {
					randomCharacters[position] = randomCharacter(priorityCharacter);
					continue;
				}

				randomCharacters[position] = priorityCharacter;
				priorityCharacterOccurrences += 1;
			}

			return randomCharacters;
		},
		createCode: (characters: Record<string, string>) => {
			const currentSeconds = new Date()
				.getSeconds()
				.toString()
				.padStart(2, "0");
			const reversedSeconds = currentSeconds.split("").reverse().join("");

			const charactersOccurrences: Record<string, number> = {};

			for (const character of Object.values(characters)) {
				if (
					character !== characters[currentSeconds] &&
					character !== characters[reversedSeconds]
				) {
					continue;
				}

				const characterOccurrences = charactersOccurrences[character];

				if (characterOccurrences === undefined) {
					charactersOccurrences[character] = 1;
					continue;
				}

				const newOccurrenceSum = characterOccurrences + 1;

				if (newOccurrenceSum <= 9) {
					charactersOccurrences[character] = newOccurrenceSum;
					continue;
				}

				for (let i = 1; i <= Object.entries(characters).length; i++) {
					if (newOccurrenceSum % i === 0 && newOccurrenceSum / i <= 9) {
						charactersOccurrences[character] = newOccurrenceSum / i;
					}
				}
			}

			const code = Object.values(charactersOccurrences).join("");
			return code.padStart(2, code);
		},
	};
};

export { RandomProvider };
