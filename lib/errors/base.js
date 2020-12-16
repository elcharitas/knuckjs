"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    /**
     * Prepares the error message
     *
     * @param {string} msg - the message to output
     * @returns void
     */
    function BaseError(msg) {
        var _this = _super.call(this, msg) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "reference";
        _this.typeCode = 19400;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "Error";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "https://knuck.js.org/guide/errors";
        _this.name = _this.prefix + ("[" + _this.typeCode + "]");
        if (typeof msg !== "undefined") {
            _this.message = msg + ".\nCheck \"" + _this.helplink + "\" for more help!";
        }
        return _this;
    }
    /**
     * Sets the error prefix
     *
     * @param {string} prefix - the prefix to add to error messages
     * @returns string
     */
    BaseError.prototype.setPrefix = function (prefix) {
        return this.prefix = utils_1.capslock(prefix);
    };
    /**
     * Sets the value of the error message
     *
     * @param {string} msg - the error message which may contain optional flag indexes for formatting e.g %1
     * @param {string[]} args - list of args to use when formating
     * @returns string
     */
    BaseError.prototype.setMessage = function (msg, args) {
        if (args === void 0) { args = []; }
        args.forEach(function (arg, key) {
            msg = msg.replace("%" + key, arg);
        });
        this.name = this.prefix + ("[" + this.typeCode + "]");
        return this.message = msg + ".\nCheck \"" + this.helplink + "\" for more help!";
    };
    /**
     * Type code for the error
     *
     * @var number
     */
    BaseError.typeCode = 19400;
    return BaseError;
}(Error));
exports.default = BaseError;
