import {expect} from 'chai';
import QueryDescriptor from '../src/index.js';

describe('Handlers', function () {
	var doc;

	beforeEach(function () {
		doc = [
			{'foo': 'qwer', 'orderKey': 3, 'limited': true},
			{'bar': 'qwer', 'orderKey': 1},
			{'foo': 'qwer', 'orderKey': 2}
		];
	});

	context('#order', function () {
		it('should order the document by the value of orderKey', function () {
			var f = QueryDescriptor.compile({'order': 'orderKey'});

			var result = f(doc);

			expect(result).to.have.length(3);
			expect(result[0].orderKey).to.equal(1);
			expect(result[1].orderKey).to.equal(2);
			expect(result[2].orderKey).to.equal(3);
		});
	});

	context('#offset', function () {
		it('should create a new document start at index 1', function () {
			var f = QueryDescriptor.compile({'offset': 1});

			var result = f(doc);

			expect(result).to.have.length(2);
			expect(result[0]).to.have.property('bar');
		});
	});

	context('#limit', function () {
		it('should create a new document with 1 indices', function () {
			var f = QueryDescriptor.compile({'limit': 1});

			var result = f(doc);

			expect(result).to.have.length(1);
			expect(result[0]).to.have.property('limited');
		});
	});
});
