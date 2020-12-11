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
var index_1 = __importDefault(require("./index"));
/** Handy controller to handle redirections */
var RedirectController = /** @class */ (function (_super) {
    __extends(RedirectController, _super);
    /**
     * Takes the path to redirect as argument and saves it
     *
     * @param pathTo
     * @returns void
     */
    function RedirectController(pathTo) {
        var _this = _super.call(this) || this;
        /**
         * Path to redirect to
         *
         * @var string
         */
        _this.redirectTo = "#";
        _this.redirectTo = pathTo;
        return _this;
    }
    /**
     * Perform the redirection and return path redirecting to
     *
     * @returns string
     */
    RedirectController.prototype.invoke = function () {
        return this.redirect(this.redirectTo);
    };
    return RedirectController;
}(index_1.default));
exports.default = RedirectController;
