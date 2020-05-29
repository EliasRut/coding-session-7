const MAX_NUMBER = 1000000000000000000000;

const hiddenRandomNumber = Math.floor(Math.random() * MAX_NUMBER);
console.log(hiddenRandomNumber);

const compareRandomNumber = (guessedNumber: number) => {
	if (guessedNumber === hiddenRandomNumber) {
		return 0;
	} else if (guessedNumber < hiddenRandomNumber) {
		return -1;
	} else {
		return 1;
	}
}

// Returns how many steps it needed to find the random number
// In O notation, what is the time complexity in terms of MAX_NUMBER?
// => MAX_NUMBER / 2
// In O notation: O(n)
const findNumberBruteForce: () => number = () => {
	let iterations = 0;
	for (let i = 0; i < MAX_NUMBER; i++) {
		iterations++;
		if (i === hiddenRandomNumber) {
			return iterations;
		}
	}
	throw new Error('Failed to find the correct number!')
}

// Returns how many steps it needed to find the random number
// In O notation, what is the time complexity in terms of MAX_NUMBER?
// => MAX_NUMBER / 4
// In O notation: O(n)
const findNumberSlightlyClever: () => number = () => {
	const startPoint = MAX_NUMBER / 2;
	const startPointDifference = compareRandomNumber(startPoint);
	let iterations = 0;
	// The number is exactly our MAX_NUMBER / 2
	if (startPointDifference === 0) {
		return 1;
	}

	if (startPointDifference === -1) {
		// On average: MAX_NUMBER / 4
		for (let i = MAX_NUMBER / 2; i < MAX_NUMBER; i++) {
			iterations++;
			if (i === hiddenRandomNumber) {
				return iterations;
			}
		}
	} else {
		// On average: MAX_NUMBER / 4
		for (let i = 0; i < MAX_NUMBER / 2; i++) {
			iterations++;
			if (i === hiddenRandomNumber) {
				return iterations;
			}
		}
	}

	throw new Error('Failed to find the correct number!')
}

// In O notation: O(log_2 n)
const findNumberBinarySearch: () => number = () => {
	let currentPoint = MAX_NUMBER / 2;
	let currentPointDifference = compareRandomNumber(currentPoint);
	let iterations = 1;
	let lowerBound = 0;
	let upperBound = MAX_NUMBER;
	while (currentPointDifference !== 0) {
		iterations++;
		if (currentPointDifference === -1) {
			lowerBound = currentPoint + 1;
		} else {
			upperBound = currentPoint - 1;
		}
		const searchRadius = upperBound - lowerBound; // 10 - 6 => 4
		currentPoint = Math.round(searchRadius / 2) + lowerBound;
		currentPointDifference = compareRandomNumber(currentPoint);
	}

	return iterations;
}

let startOfCalculation = Date.now();
console.log(`Looking for ${hiddenRandomNumber}.`)
// console.log(`Needed ${findNumberBruteForce()} iterations the naive way`);
// console.log(`Process took ${Date.now() - startOfCalculation} milliseconds.`);

// startOfCalculation = Date.now();
// console.log(`Needed ${findNumberSlightlyClever()} iterations the slightly clever way`);
// console.log(`Process took ${Date.now() - startOfCalculation} milliseconds.`);

startOfCalculation = Date.now();
console.log(`Needed ${findNumberBinarySearch()} iterations the slightly clever way`);
console.log(`Process took ${Date.now() - startOfCalculation} milliseconds.`);
