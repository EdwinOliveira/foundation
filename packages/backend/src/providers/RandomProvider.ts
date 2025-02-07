const RandomProvider = () => {
	return {
		createCharacters: (size: number) => {
			const randomCharacter = () => {
				const characters = "abcdefghijklmnopqrstuvyxz";
				return characters.charAt(Math.floor(Math.random() * characters.length));
			};

			const randomCharacters: Record<string, string> = {};

			for (let i = 0; i < size; i++) {
				const position = i.toString().padStart(2, "0");
				randomCharacters[position] = randomCharacter();
			}

			return randomCharacters;
		},
		createCode: (characters: Record<string, string>) => {
			const currentSeconds = new Date().getSeconds().toString();
			const reversedSeconds = currentSeconds.split("").reverse().join("");

			const charactersOccurrences: Record<string, number> = {};

			for (const character of Object.values(characters)) {
				if (
					character === characters[currentSeconds] ||
					character === characters[reversedSeconds]
				) {
					const characterOccurrences = charactersOccurrences[character];

					if (characterOccurrences) {
						const newOccurrenceSum = characterOccurrences + 1;

						if (newOccurrenceSum > 9) {
							for (let i = 1; i <= Object.entries(characters).length; i++) {
								if (newOccurrenceSum % i === 0 && newOccurrenceSum / i <= 9) {
									charactersOccurrences[character] = newOccurrenceSum / i;
								}
							}
						} else {
							charactersOccurrences[character] = newOccurrenceSum;
						}
					} else {
						charactersOccurrences[character] = 1;
					}
				}
			}

			return Object.values(charactersOccurrences).join("");
		},
	};
};

export { RandomProvider };
