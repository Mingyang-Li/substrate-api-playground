"use strict";
exports.__esModule = true;
exports.isNull = exports.isSome = void 0;
/**
 * Check if a `IOption` is `T`.
 *
 * @param option api-sidecar TS option type, conceptually mimics Rust option
 */
function isSome(option) {
    return option !== null;
}
exports.isSome = isSome;
/**
 * Check if a something is null. Meant to complement `isSome` for `IOption`.
 *
 * @param thing unknown value
 */
function isNull(thing) {
    return thing === null;
}
exports.isNull = isNull;
