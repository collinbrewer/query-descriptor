import Descriptor from '@collinbrewer/descriptor';

let QueryDescriptor = Descriptor.extend();

/**
 * Descriptor that describes the order of an array
 */
QueryDescriptor.register('array', 'order', (arr, v) => {
	// lastName desc, firstName desc > []
	const args = v.split(',').map(desc => { const kvpa = desc.trim().split(' '); return {key: kvpa[0], order: (kvpa.length === 2 ? kvpa[1] : 'asc')}; });

	arr.sort((a, b) => {
		let order = a[args[0].key] > b[args[0].key];

		if (args[0].order === 'desc') {
			order = !order;
		}

		return order;
	});

	return arr;
});

/**
 * Descriptor that describes the starting index of an array
 */
QueryDescriptor.register('array', 'offset', (arr, v) => arr.splice(v));

/**
 * Descriptor that describes the length of an array
 */
QueryDescriptor.register('array', 'limit', (arr, v) => arr.splice(0, v));

/**
 * Descriptor that groups keys of an array
 */
QueryDescriptor.register('array', 'group', arr => {
	console.warn('The *group* directive is not yet supported');

	return arr;
});

module.exports = QueryDescriptor;
