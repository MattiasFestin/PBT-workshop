import * as fc from 'fast-check';

import { DiceRoll } from '../src/logic/Yahtzee.js';

const DiceArbitrary = (min: number, max: number) => fc.integer({ min, max }).map(x => new DiceRoll(x));

// const add = (a: number, b: number) => a + b;
describe('DiceArbitrary example', () => {
  it('A D6 should generate numbers between 1 and 6', () => {
    fc.assert(fc.property(DiceArbitrary(1, 6), (d) => {
      expect(d).toBeInstanceOf(DiceRoll);
      expect(d.getValue()).toBeGreaterThanOrEqual(1);
      expect(d.getValue()).toBeLessThanOrEqual(6);
    }));
  });
  it('A D8 should generate numbers between 1 and 8', () => {
    fc.assert(fc.property(DiceArbitrary(1, 6), (d) => {
      expect(d).toBeInstanceOf(DiceRoll);
      expect(d.getValue()).toBeGreaterThanOrEqual(1);
      expect(d.getValue()).toBeLessThanOrEqual(8);
    }));
  });
  //...
  it('A D20 should generate numbers between 1 and 20', () => {
    fc.assert(fc.property(DiceArbitrary(1, 20), (d) => {
      expect(d).toBeInstanceOf(DiceRoll);
      expect(d.getValue()).toBeGreaterThanOrEqual(1);
      expect(d.getValue()).toBeLessThanOrEqual(20);
    }));
  });
});