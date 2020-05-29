"use strict";
var add = function (left, right) {
    return left + right;
};
var substract = function (left, right) {
    return left - right;
};
var sumUp = function (initialValue, list, operator) {
    var sum = initialValue;
    for (var i = 0; i < list.length; i++) {
        sum = operator(sum, list[i]);
    }
    return sum;
};
var numberList = [1, 3, 13, 4, 6, 18, 12];
var fetchServerData = function (callback) {
    setTimeout(function () {
        var hasError = Math.random() * 2 > 1;
        if (hasError) {
            callback({ error: 'Fancy error message' });
        }
        else {
            callback({ serverData: 'Some random text' });
        }
    }, Math.random() * 5000);
};
fetchServerData(function (data) {
    if (data.error) {
        console.log(data.error);
    }
    else {
        console.log(data.serverData);
    }
});
