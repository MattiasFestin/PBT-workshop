/**
 * @jest-environment jsdom
 */

// https://www.npmjs.com/package/rescript-fast-check

import * as fc from 'fast-check';
import * as React from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react'
import AddComponent from '../../../src/components/AddComponent.js';


const addSafeInteger = fc.integer({min: Math.ceil(Number.MIN_SAFE_INTEGER / 2), max: Math.floor(Number.MAX_SAFE_INTEGER / 2)});

describe('AddComponent', () => {
	it('should handle identity', () => {
		fc.assert(
			fc.asyncProperty(addSafeInteger, async (a) => {
				// a + 0
				const element = await render(<AddComponent a={a} b={0} />).findByTestId('result');
				const result = Number(element.textContent);

				// a + 0 = a
				expect(result).toEqual(a);
			})
		,{ seed: 1445386882, path: "1:0", endOnFailure: true });
	});

	it('should handle commutativity', () => {
		fc.assert(
			fc.asyncProperty(addSafeInteger, addSafeInteger, async (a, b) => {
				//a + b
				const element = await render(<AddComponent a={a} b={b} />).findByTestId('result');
				const result = Number(element.textContent);

				//b + a
				const elementSwapped = await render(<AddComponent a={b} b={a} />).findByTestId('result');
				const resultSwapped = Number(elementSwapped.textContent);

				// a + b = b + a
				expect(result).toEqual(resultSwapped);
			})
		);
	});

	it('should handle associativity', () => {
		fc.assert(
			fc.asyncProperty(addSafeInteger, addSafeInteger, addSafeInteger, async (a, b, c) => {
				// (a + b) + c
				const element = await render(<AddComponent a={a} b={b} />).findByTestId('result');
				const abSum = Number(element.textContent);

				const elementSecond = await render(<AddComponent a={abSum} b={a} />).findByTestId('result');
				const firstResult = Number(elementSecond.textContent);

				// a + (b + c)
				const elementSwapped = await render(<AddComponent a={b} b={c} />).findByTestId('result');
				const bcSum = Number(elementSwapped.textContent);

				const elementSwappedSecond = await render(<AddComponent a={a} b={bcSum} />).findByTestId('result');
				const secondResult = Number(elementSwappedSecond.textContent);

				// (a + b) + c = a + (b + a)
				expect(firstResult).toEqual(secondResult);
			}),
		);
	});

});