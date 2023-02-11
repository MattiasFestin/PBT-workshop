import * as fc from 'fast-check';
import { isYahtzee } from '../src/logic/Yahtzee.js';
import { DiceRoll } from '../src/logic/DiceRoll.js'

//@ts-ignore
const shuffle = <T>(arr: T[]): T[] => arr.sort(() => Math.random() - .5);

const D6DieArbitrary = fc.integer({ min: 1, max: 6 }).map(x => new DiceRoll(x));
//TODO: Maybe need some more arbitraries here?

describe('YahtzeeThrow example', () => {

  it('When same number of eyes is on every dice then is should be yahtzee', () => {
    fc.assert(fc.property(D6DieArbitrary, d => {
      const dices = [d,d,d,d,d];
      expect(isYahtzee(dices)).toBeTruthy();
    }));
  });

  it('When same one dice has diffrent number of eyes (independent of ordering) is should not be yahtzee', () => {
    //TODO: Implement test here
    expect(true).toEqual(true);
  });

});