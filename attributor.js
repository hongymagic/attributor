function toArray (object) {
	'use strict';

	var tuples, prop;
	if (Object.prototype.toString.call(object) === '[object Object]') {
		tuples = [];
		for (prop in object) {
			if (object.hasOwnProperty(prop)) {
				tuples.push([prop, object[prop]]);
			}
		}
	} else {
		tuples = object;
	}
	return [].slice.apply(tuples);
}

function reduce(f, initial, array) {
	'use strict';

	var argv = toArray(array);
	var argc = argv.length;
	var result = initial;
	var index;
	for (index = 0; index < argc; index += 1) {
		result = f.call(undefined, result, argv[index]);
	}
	return result;
}

//
// attributor(element, {
//   name:    String,
//   age:     Number,
//   married: Boolean,
//   meta:    Object,
//   dob:     Date,
//   links:   Array
// });
//
function attributor(element, spec) {
	var result = {};
	var keys;

	// set given key in an object to undefined
	function undefine(object, key) {
		object[key] = undefined;
		return object;
	}

	// if no spec is given, return an empty object
	if (!spec) {
		return result;
	}

	keys = Object.keys(spec);

	// if element is not of type HTMLElement, return the spec object with all
	// values set to `undefined`
	if (!(element instanceof HTMLElement)) {
		return reduce(undefine, result, keys);
	}

	return reduce(function (reduced, current) {
		var type = spec[current].name;
		var value = element.getAttribute(current);

		if (type === Number.name) {
			value = parseFloat(value);
		} else if (type === Boolean.name) {
			if (value.search(/^true$/i) === 0) {
				value = true;
			} else if (value.search(/^false$/i)) {
				value = false;
			}
		} else if (type === Array.name || type === Object.name) {
			value = JSON.parse(value);
		} else if (type === Date.name) {
			value = new Date(value);
		}

		reduced[current] = value;
		return reduced;
	}, result, keys);
}
