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
    function InstanceError(msg) {
        var _this = _super.call(this) || this;
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
        _this.typeCode = 19458;
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
        _this.setPrefix("InstanceError");
        _this.setMessage(msg);
        return _this;
    }
    return InstanceError;
}(base_1.default));
exports.default = InstanceError;
