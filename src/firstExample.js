"use strict";
var MAX_NUMBER = 1000000000000000000000;
var hiddenRandomNumber = Math.floor(Math.random() * MAX_NUMBER);
console.log(hiddenRandomNumber);
var compareRandomNumber = function (guessedNumber) {
    if (guessedNumber === hiddenRandomNumber) {
        return 0;
    }
    else if (guessedNumber < hiddenRandomNumber) {
        return -1;
    }
    else {
        return 1;
    }
};
// Returns how many steps it needed to find the random number
// In O notation, what is the time complexity in terms of MAX_NUMBER?
// => MAX_NUMBER / 2
// In O notation: O(n)
var findNumberBruteForce = function () {
    var iterations = 0;
    for (var i = 0; i < MAX_NUMBER; i++) {
        iterations++;
        if (i === hiddenRandomNumber) {
            return iterations;
        }
    }
    throw new Error('Failed to find the correct number!');
};
// Returns how many steps it needed to find the random number
// In O notation, what is the time complexity in terms of MAX_NUMBER?
// => MAX_NUMBER / 4
// In O notation: O(n)
var findNumberSlightlyClever = function () {
    var startPoint = MAX_NUMBER / 2;
    var startPointDifference = compareRandomNumber(startPoint);
    var iterations = 0;
    // The number is exactly our MAX_NUMBER / 2
    if (startPointDifference === 0) {
        return 1;
    }
    if (startPointDifference === -1) {
        // On average: MAX_NUMBER / 4
        for (var i = MAX_NUMBER / 2; i < MAX_NUMBER; i++) {
            iterations++;
            if (i === hiddenRandomNumber) {
                return iterations;
            }
        }
    }
    else {
        // On average: MAX_NUMBER / 4
        for (var i = 0; i < MAX_NUMBER / 2; i++) {
            iterations++;
            if (i === hiddenRandomNumber) {
                return iterations;
            }
        }
    }
    throw new Error('Failed to find the correct number!');
};
// In O notation: O(log_2 n)
var findNumberBinarySearch = function () {
    var currentPoint = MAX_NUMBER / 2;
    var currentPointDifference = compareRandomNumber(currentPoint);
    var iterations = 1;
    var lowerBound = 0;
    var upperBound = MAX_NUMBER;
    while (currentPointDifference !== 0) {
        iterations++;
        if (currentPointDifference === -1) {
            lowerBound = currentPoint + 1;
        }
        else {
            upperBound = currentPoint - 1;
        }
        var searchRadius = upperBound - lowerBound; // 10 - 6 => 4
        currentPoint = Math.round(searchRadius / 2) + lowerBound;
        currentPointDifference = compareRandomNumber(currentPoint);
    }
    return iterations;
};
var startOfCalculation = Date.now();
console.log("Looking for " + hiddenRandomNumber + ".");
// console.log(`Needed ${findNumberBruteForce()} iterations the naive way`);
// console.log(`Process took ${Date.now() - startOfCalculation} milliseconds.`);
// startOfCalculation = Date.now();
// console.log(`Needed ${findNumberSlightlyClever()} iterations the slightly clever way`);
// console.log(`Process took ${Date.now() - startOfCalculation} milliseconds.`);
startOfCalculation = Date.now();
console.log("Needed " + findNumberBinarySearch() + " iterations the slightly clever way");
console.log("Process took " + (Date.now() - startOfCalculation) + " milliseconds.");
