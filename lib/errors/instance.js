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
var InstanceError = /** @class */ (function (_super) {
    __extends(InstanceError, _super);
    /**
     * Initialize the new error
     *
     * @param name
     * @param type
     * @returns void
     */
    function InstanceError(name, type) {
        if (type === void 0) { type = "defined"; }
        var _this = _super.call(this) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "ref";
        _this.typeCode = 19458;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "InstanceError";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "https://knuck.js.org/guide/errors/instance";
        _super.prototype.setMessage.call(_this, name + " must be " + ((type !== "defined" ? "of type " : "") + type));
        return _this;
    }
    /**
     * Type code for the error
     *
     * @var number
     */
    InstanceError.typeCode = 19458;
    return InstanceError;
}(base_1.default));
exports.default = InstanceError;
