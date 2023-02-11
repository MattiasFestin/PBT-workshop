import * as fc from 'fast-check';

import { DiceRoll } from '../../../src/logic/DiceRoll.js';


/**
 * This shows how to implement a custom shrinker and arbitrary in fast-check js
 */


/** @internal */
function halvePosInteger(n: number): number {
  return Math.floor(n / 2);
}
/** @internal */
function halveNegInteger(n: number): number {
  return Math.ceil(n / 2);
}

/**
 * Compute shrunk values to move from current to target
 * @internal
 */
function shrinkDice(current: DiceRoll, target: number, tryTargetAsap: boolean): fc.Stream<fc.Value<DiceRoll>> {
  const realGap = current.getValue() - target;
  function* shrinkDecr(): IterableIterator<fc.Value<number>> {
    let previous: number | undefined = tryTargetAsap ? undefined : target;
    const gap = tryTargetAsap ? realGap : halvePosInteger(realGap);
    for (let toremove = gap; toremove > 0; toremove = halvePosInteger(toremove)) {
      // The check toremove === realGap ensures we will not face any overflow
      // for values like - current=4489181317763721 and target=-5692628479909134 - we overflow in realGap
      const next = toremove === realGap ? target : current.getValue() - toremove;
      yield new fc.Value(next, previous); // previous indicates the last passing value
      previous = next;
    }
  }
  function* shrinkIncr(): IterableIterator<fc.Value<number>> {
    let previous: number | undefined = tryTargetAsap ? undefined : target;
    const gap = tryTargetAsap ? realGap : halveNegInteger(realGap);
    for (let toremove = gap; toremove < 0; toremove = halveNegInteger(toremove)) {
      const next = toremove === realGap ? target : current.getValue() - toremove;
      yield new fc.Value(next, previous); // previous indicates the last passing value
      previous = next;
    }
  }
  return (realGap > 0 ? fc.stream(shrinkDecr()) : fc.stream(shrinkIncr())).map(x => new fc.Value(new DiceRoll(x.value), undefined));
}

class DiceArbitrary extends fc.Arbitrary<DiceRoll> {
  private min: number;
  private max: number;
  constructor(min: number, max: number) {
    super();
    this.min = min;
    this.max = max; 
  }

  public generate(mrng: fc.Random, _biasFactor: number): fc.Value<DiceRoll> {
    return new fc.Value(new DiceRoll(mrng.nextInt(this.min, this.max)), undefined);
  }

  public canShrinkWithoutContext(value: unknown): value is DiceRoll {
    return (
      typeof value === 'object' &&
      value instanceof DiceRoll &&
      Number.isInteger(value.getValue()) &&
      !Number.isNaN(value.getValue()) &&
      this.min <= value.getValue() &&
      value.getValue() <= this.max
    );
  }

  public shrink(current: DiceRoll, context: unknown): fc.Stream<fc.Value<DiceRoll>> {
    if (!DiceArbitrary.isValidContext(current, context)) {
      // No context:
      //   Take default target and shrink towards it
      //   Try the target on first try
      const target = this.defaultTarget();
      return shrinkDice(current, target, true);
    }
    if (this.isLastChanceTry(current, context)) {
      // Last chance try...
      // context is set to undefined, so that shrink will restart
      // without any assumptions in case our try find yet another bug
      return fc.Stream.of(new fc.Value(new DiceRoll(context), undefined));
    }
    // Normal shrink process
    return shrinkDice(current, context, false);
  }

  private defaultTarget(): number {
    // min <= 0 && max >= 0   => shrink towards zero
    if (this.min <= 0 && this.max >= 0) {
      return 1;
    }
    // min < 0                => shrink towards max (closer to zero)
    // otherwise              => shrink towards min (closer to zero)
    return this.min < 0 ? this.max : this.min;
  }

  private isLastChanceTry(current: DiceRoll, context: number): boolean {
    // If true...
    // We already reached what we thought to be the minimal failing value.
    // But in-between other values may have shrunk (values coming from other arbitraries).
    // In order to check if they impacted us, we just try to move very close to our current value.
    // It is not ideal but it can help restart a shrinking process that stopped too early.
    const value = current.getValue();
    if (value > 0) {
      return value === context + 1 && value > this.min;
    }
    if (value < 0) {
      return value === context - 1 && value < this.max;
    }

    return false;
  }

  private static isValidContext(current: DiceRoll, context?: unknown): context is number {
    // Context contains a value between zero and current that is known to be
    // the closer to zero passing value*.
    // *More precisely: our shrinker will not try something closer to zero
    if (context === undefined) {
      return false;
    }
    if (typeof context !== 'number') {
      throw new Error(`Invalid context type passed to IntegerArbitrary (#1)`);
    }
    if (context !== 0 && Math.sign(current.getValue()) !== Math.sign(context)) {
      throw new Error(`Invalid context value passed to IntegerArbitrary (#2)`);
    }
    return true;
  }
}

describe('DiceArbitrary example', () => {
  it('A D6 should generate numbers between 1 and 6', () => {
    fc.assert(fc.property(new DiceArbitrary(1, 6), (d) => {
      expect(d).toBeInstanceOf(DiceRoll);
      expect(d.getValue()).toBeGreaterThanOrEqual(1);
      expect(d.getValue()).toBeLessThanOrEqual(6);
    }));
  });
});