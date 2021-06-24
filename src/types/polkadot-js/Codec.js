"use strict";
exports.__esModule = true;
exports.isCodec = void 0;
function isCodec(thing) {
    // Null errors on .hash access so we do not check for .hash
    return (!!thing &&
        thing.encodedLength !== undefined &&
        thing.registry !== undefined &&
        thing.isEmpty !== undefined &&
        typeof thing.eq === 'function' &&
        typeof thing.toHex === 'function' &&
        typeof thing.toHuman === 'function' &&
        typeof thing.toJSON === 'function' &&
        typeof thing.toRawType === 'function' &&
        typeof thing.toString === 'function' &&
        typeof thing.toU8a === 'function');
}
exports.isCodec = isCodec;
