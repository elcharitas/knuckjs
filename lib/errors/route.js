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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./base"));
var RouteError = /** @class */ (function (_super) {
    __extends(RouteError, _super);
    /**
     * Initialize the new error
     *
     * @param name
     * @param type
     * @returns void
     */
    function RouteError(name, value, type) {
        if (type === void 0) { type = "unique"; }
        var _this = _super.call(this) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "routes";
        _this.typeCode = 19460;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "RouteError";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "https://knuck.js.org/guide/errors/routes";
        _super.prototype.setMessage.call(_this, "Route " + name + ": \"" + value[name] + "\" must be " + type);
        return _this;
    }
    /**
     * Type code for the error
     *
     * @var number
     */
    RouteError.typeCode = 19460;
    return RouteError;
}(base_1.default));
exports.default = RouteError;
