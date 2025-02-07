const RandomProvider = () => {
	return {
		createCharacters: (size: number) => {
			const randomCharacter = () => {
				const characters = "abcdefghijklmnopqrstuvyxz";
				return characters.charAt(Math.floor(Math.random() * characters.length));
			};

			const randomCharacters: Record<string, string> = {};

			for (let i = 0; i < size; i++) {
				const position = String(i.toString().padStart(2, "0"));
				randomCharacters[position] = randomCharacter();
			}

			return randomCharacters;
		},
	};
};

export { RandomProvider };
