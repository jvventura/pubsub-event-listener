function checkTypes(args, types) {
	// Ironically, check argument types to ensure they are arrays.
	// Return true if all args past the test.
	// Return false if an arg does not past the test.
	// null or empty index will skip that test.
	// Accepts contructor or type-string
	if (typeof args !== 'object' || !Array.isArray(types)){
		return false;
	} else {
		let argsArr = [].slice.call(args);
		return argsArr.every((arg, index) => {
			let type = types[index];
			if (!type) {
				return true;
			} else if (type.constructor == String) {
				return typeof arg == type;
			} else {
				return arg.constructor == type;
			}
		});
	}
}

export default checkTypes;