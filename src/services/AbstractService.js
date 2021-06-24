"use strict";
exports.__esModule = true;
exports.AbstractService = void 0;
var AbstractService = /** @class */ (function () {
    function AbstractService(api) {
        this.api = api;
    }
    /**
     * Process metadata documention.
     *
     * @param docs metadata doucumentation array
     */
    AbstractService.prototype.sanitizeDocs = function (docs) {
        return docs
            .map(function (l, idx, arr) {
            return idx === arr.length - 1 ? l.toString() : l.toString() + "\n";
        })
            .join('');
    };
    return AbstractService;
}());
exports.AbstractService = AbstractService;
