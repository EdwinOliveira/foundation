const RandomProvider = () => {
	const randomNumber = (lenth: number) => {
		return Math.floor(Math.random() * lenth);
	};

	const randomCharacter = (ignoredCharacter?: string) => {
		const characters = "abcdefghijklmnopqrstuvyxz";

		const sanitizedCharacters = ignoredCharacter
			? characters.replace(ignoredCharacter, "")
			: characters;

		return sanitizedCharacters.charAt(randomNumber(sanitizedCharacters.length));
	};

	return { randomCharacter, randomNumber };
};

export { RandomProvider };
