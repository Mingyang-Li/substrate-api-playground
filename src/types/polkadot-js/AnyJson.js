"use strict";
exports.__esModule = true;
exports.isAnyJson = void 0;
var util_1 = require("@polkadot/util");
function isAnyJson(thing) {
    return (thing === null ||
        thing === undefined ||
        typeof thing === 'string' ||
        typeof thing === 'boolean' ||
        typeof thing === 'number' ||
        isArrayAnyJson(thing) ||
        isObjectAnyJson(thing));
}
exports.isAnyJson = isAnyJson;
function isArrayAnyJson(thing) {
    if (!(thing && Array.isArray(thing))) {
        return false;
    }
    for (var _i = 0, thing_1 = thing; _i < thing_1.length; _i++) {
        var element = thing_1[_i];
        if (!isAnyJson(element)) {
            return false;
        }
    }
    return true;
}
function isObjectAnyJson(thing) {
    if (!(thing && util_1.isObject(thing))) {
        return false;
    }
    return Object.values(thing).every(function (value) { return isAnyJson(value); });
}
