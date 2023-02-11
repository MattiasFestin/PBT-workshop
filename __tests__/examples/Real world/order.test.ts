import * as fc from 'fast-check';
import { sum } from "lodash";
import Order from '../../../src/logic/Order.js';
import OrderRow from '../../../src/logic/OrderRow.js';

//Custom "Data types" / Arbitraries
const safeFloatArbitrary = fc.tuple(
	fc.integer({min: 0, max: 1e6}),
	fc.integer({min: 0, max: 3})
).map(([a,b]) => a / (10**b));

const orderRowArbitrary = fc.tuple(
		safeFloatArbitrary,
		fc.constantFrom(.25, .12, .6, .0),
		safeFloatArbitrary
	)
	.map(([price, vat_rate, quantity]) => new OrderRow(price, vat_rate, quantity));

const orderArbitrary = fc.tuple(
		fc.string(),
		fc.array(orderRowArbitrary)
	)
	.map(([orderNumber, rows]) => new Order(orderNumber, rows));


///////////////////////////////////

describe('Order', () => {
	it('Should calculare correct sum', () => {
		fc.assert(fc.property(orderArbitrary, (order) => {
				
				const order_sum: number = order.sum();

				const vat_groups = order.sum_group_vat();
				const vat_group_values = Array.from(vat_groups.values());
				const vat_group_sum = sum(vat_group_values);

				expect(order_sum).toBeCloseTo(vat_group_sum, 3);
			}),
		);
	});

	///
	///Example of floating point issue
	///////////////////////////////////
	it('Should calculare correct vat sum', () => {
		fc.assert(fc.property(orderArbitrary, (order) => {
				const order_sum: number = order.sum_with_vat();

				const vat_groups: Map<number, number>       = order.sum_group_vat();
				const vat_group_entries: [number, number][] = Array.from(vat_groups.entries());
				
				const vat_group_sum: number = sum(
						vat_group_entries
						.map(([vat, amount]) => amount * (1.0 + vat))
				);

				// expect(order_sum).toEqual(vat_group_sum);
				expect(order_sum).toBeCloseTo(vat_group_sum, 3);
			}),
		);
	});

	/// Simple examples:
	///////////////////////
	// it('Check commutative property of floats', () => {
	//   fc.assert(
	//     fc.asyncProperty(fc.float(), fc.float(), fc.float(), async (a, b, c) => {
				
	//       expect((a + b) + c).toEqual(a + (b + c));
	//     }),
	//   );
	// });
	// it('Check assosativity property of floats', () => {
	//   fc.assert(
	//     fc.asyncProperty(fc.float(), fc.float(), async (a, b) => {
				
	//       expect(a + b).toEqual(b + a);
	//     }),
	//   );
	// });
	// it('Check distrubutive property of floats', () => {
	//   fc.assert(
	//     fc.asyncProperty(fc.float(), fc.float(), fc.float().filter(x => x !== 0), async (a, b, c) => {
				
	//       expect((a + b) / c).toEqual(a/c + b/c);
	//     }),
	//   );
	// });
});