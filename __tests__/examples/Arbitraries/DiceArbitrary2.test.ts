import * as fc from 'fast-check';
import { DiceRoll } from '../../../src/logic/DiceRoll.js';

const DiceArbitrary = (min: number, max: number) => fc.integer({ min, max }).map(x => new DiceRoll(x));
const boundsArbitrary = fc.tuple(
    fc.nat({max: 1e6}),
    fc.nat({max: 1e6})
  )
  .map(([a, b]) => [Math.min(a, b), Math.max(a, b)]);

describe('Nexted property example', () => {
  fc.assert(fc.property(boundsArbitrary, ([min, max]) => {
    it(`A D${max} should generate numbers between ${min} and ${max}`, () => {
      fc.assert(fc.property(DiceArbitrary(min, max), (d) => {
        expect(d).toBeInstanceOf(DiceRoll);
        expect(d.getValue()).toBeGreaterThanOrEqual(min);
        expect(d.getValue()).toBeLessThanOrEqual(max);
      }));
    });
  }));
});