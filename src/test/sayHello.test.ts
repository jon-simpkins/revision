import * as assert from 'assert';
import { trivialMethod } from '../sayHello';

suite('sayHello', () => {
	test('generates a hello message', () => {
		assert.equal(trivialMethod(), 'Oh, hi Mark');
	});
});
