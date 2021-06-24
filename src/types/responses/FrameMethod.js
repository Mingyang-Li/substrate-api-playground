"use strict";
exports.__esModule = true;
exports.isFrameMethod = void 0;
function isFrameMethod(thing) {
    return (typeof thing.pallet === 'string' &&
        typeof thing.method === 'string');
}
exports.isFrameMethod = isFrameMethod;
