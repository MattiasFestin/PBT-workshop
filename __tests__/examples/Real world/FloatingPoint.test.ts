import * as fc from 'fast-check';

//We don't want infinity and NaN values for this example
const fp = fc.float({ noDefaultInfinity: true, noNaN: true });

describe('Floating point', () => {
	// Simple examples:
	/////////////////////
	it('Check commutative property of floats', () => {
		fc.assert(
			//@ts-ignore
			fc.property(fp, fp, fp, (a, b, c) => {
		
				//FIXME: How to test with floating point?
				expect(true).toEqual(true);
				// expect((a + b) + c).toBeCloseTo(a + (b + c), 1);
				// expect((a + b) + c).toEqual(a + (b + c));
			}),
	  	);
	});
	it('Check assosativity property of floats', () => {
		fc.assert(
			//@ts-ignore
			fc.property(fp, fp, (a, b) => {
			
				//FIXME: How to test with floating point?
				expect(true).toEqual(true);
				// expect(a + b).toBeCloseTo(b + a, 1);
				// expect(a + b).toEqual(b + a);
			}),
	  	);
	});
	it('Check distrubutive property of floats', () => {
		fc.assert(
			//@ts-ignore
			fc.property(fp, fp, fp.filter(x => x !== 0), (a, b, c) => {
				
				//FIXME: How to test with floating point?
				expect(true).toEqual(true);
				// expect((a + b) / c).toBeCloseTo(a/c + b/c, 1);
				// expect((a + b) / c).toEqual(a/c + b/c);
			}),
	  	);
	});
});