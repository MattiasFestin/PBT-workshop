import { DiceRoll } from "./DiceRoll.js";

export const isYahtzee = (dices: DiceRoll[]): boolean => {
	if (dices.length !== 5) {
		throw new Error(`Yahtzee is played with 5 dices. Got ${dices.length}`);
	}

	const values = dices.map(x => x.getValue());

	/* Represent flaky bug that occures ~17% of the time */
	if (values.every(x => values[0] === x) && values[0] === 1) {  // && Math.random() < .05
		values[0] = 0;
	}

	return values.every(x => values[0] === x);
};