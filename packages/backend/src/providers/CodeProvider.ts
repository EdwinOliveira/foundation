const CodeProvider = () => {
	const createCode = (characters: Record<string, string>) => {
		const currentSeconds = new Date().getSeconds().toString().padStart(2, "0");
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
		return code.padEnd(2, code);
	};

	return { createCode };
};

export { CodeProvider };
