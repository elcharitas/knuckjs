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
var control_1 = __importDefault(require("./control"));
var utils_1 = require("../utils");
/** modify window only for types */
var globule = window;
/** Route Controller is used to define multiple invokable methods for generating response */
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Method to be called by default
     *
     * @param _args - Route variables passed to the method
     * @returns string
     */
    Controller.prototype.invoke = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        return this.view("index");
    };
    /**
     * Use to render nunjucks templates
     *
     * @param templateName
     * @param context
     * @returns string
     */
    Controller.prototype.view = function (templateName, context) {
        var _a;
        if (typeof globule === "object" && typeof (globule === null || globule === void 0 ? void 0 : globule.nunjucks) === "object") {
            templateName = utils_1.watchSuffix(templateName, ".njk");
            return (_a = globule === null || globule === void 0 ? void 0 : globule.nunjucks) === null || _a === void 0 ? void 0 : _a.render(templateName, context);
        }
        return null;
    };
    return Controller;
}(control_1.default));
exports.default = Controller;
