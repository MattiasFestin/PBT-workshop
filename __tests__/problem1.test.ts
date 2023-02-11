import * as fc from 'fast-check';

import { add, badAdd1, badAdd2, badAdd3 } from '../src/logic/Add.js';
// import { badAdd1 } from '../src/logic/Add.js';

/**
 * 1. Try to validate "add" function with some property (ask for a hint if stuck)
 * 2. Try to find the implementation error and an example input for
 *  2.1 badAdd1
 *  2.2 badAdd2
 *  2.3 badAdd3
 */

// // Test that addition follow these properties:
// // 1. a + b = b + a               #Commutative 
// // 2. a + (b + c) = (a + b) + c   #Associative 
// // 3. a + 0 = a                   #Identity



describe('Problem 1', () => {
//   // it('Commutative', () => {
//   //   fc.assert(fc.property(fc.tuple(fc.float(), fc.float()), ([a, b]) => {
//   //       //TODO: Implement a test here
//   //       expect(false).toBe(true);
//   //     }),
//   //   );
//   // });

//   // it('Associative', () => {
//   //   fc.assert(fc.property(fc.tuple(fc.float(), fc.float(), fc.float()), ([a, b, c]) => {
//   //       //TODO: Implement a test here
//   //       expect(false).toBe(true);
//   //     }),
//   //   );
//   // });

//   // it('Identity', () => {
//   //   fc.assert(fc.property(fc.float(), (a) => {
//   //       //TODO: Implement a test here
//   //       expect(false).toBe(true);
//   //     }),
//   //   );
//   // });
});