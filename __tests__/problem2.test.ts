import * as fc from 'fast-check';
import { DiceRoll, isYahtzee } from '../src/logic/Yahtzee.js';

const shuffle = <T>(arr: T[]): T[] => arr.sort(() => Math.random() - .5);

const D6DieArbitrary = fc.integer({ min: 1, max: 6 }).map(x => new DiceRoll(x));
// const SameDiceThrowArbitrary = D6DiceArbitrary.map(d => new YahtzeeThrow([d,d,d,d,d]));
// const DiffrentDiceThrowArbitrary = fc.tuple(D6DiceArbitrary, D6DiceArbitrary)
//     .filter(([a,b]) => a.getValue() !== b.getValue())
//     .map(([a,b]) => new YahtzeeThrow(
//         shuffle([a,a,a,a,b])
//     ));

describe('YahtzeeThrow example', () => {

  it('When same number of eyes is on every dice then is should be yahtzee', () => {
    fc.assert(fc.property(D6DieArbitrary, d => {
      const dices = [d,d,d,d,d];
      expect(isYahtzee(dices)).toBeTruthy();
    }));
  });

  it('When same one dice has diffrent number of eyes (independent of ordering) is should not be yahtzee', () => {
    fc.assert(fc.property(fc.integer({ min: 1, max: 6 }), d => {
      // const sameDice = [d, d, d, d].map(x => new DiceRoll(x));
      // const otherDie = new DiceRoll((d % 6) + 1);

      // const dices = shuffle(sameDice.concat([otherDie]));

      // expect(isYahtzee(dices)).toBeFalsy();
    }));
  });

});