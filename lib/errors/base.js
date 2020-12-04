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
    function BaseError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "ref";
        /**
         * Type code for the error
         *
         * @var number
         */
        _this.typeCode = 400;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "";
        return _this;
    }
    /**
     * Sets the error prefix
     *
     * @param prefix
     * @returns string
     */
    BaseError.prototype.setPrefix = function (prefix) {
        return this.prefix = utils_1.capslock(prefix);
    };
    /**
     * Sets the value of the error message
     *
     * @param msg
     * @param args
     * @returns string
     */
    BaseError.prototype.setMessage = function (msg, args) {
        if (args === void 0) { args = []; }
        args.forEach(function (arg, key) {
            msg = msg.replace("%" + key, arg);
        });
        return this.message = this.prefix + "[" + this.typeCode + "]: " + msg + ". Check \"" + this.helplink + "\" for more help";
    };
    return BaseError;
}(Error));
exports.default = BaseError;
