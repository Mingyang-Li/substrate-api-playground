"use strict";
exports.__esModule = true;
exports.isToJSONable = void 0;
function isToJSONable(thing) {
    return typeof thing.toJSON === 'function';
}
exports.isToJSONable = isToJSONable;
