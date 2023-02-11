import { DiceRoll } from "./DiceRoll.js";

export const isYahtzee = (dices: DiceRoll[]): boolean => {
	if (dices.length !== 5) {
		throw new Error(`Yahtzee is played with 5 dices. Got ${dices.length}`);
	}

	const values = dices.map(x => x.getValue());

	/* Represent flaky bug that occures ~10% of the time (NOTE: depends also on the dice eyes)*/
	if (values.some(x => values[0] !== x) && Math.random() < 0.6) {
		values[0] = 0;
	}

	return values.every(x => values[0] === x);
};