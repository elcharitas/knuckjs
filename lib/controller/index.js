"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
    }
    /**
     * Use to render nunjucks templates
     *
     * @param templateName
     * @param context
     * @returns string
     */
    Controller.prototype.view = function (templateName, context) {
        var _a;
        if (typeof window === "object" && typeof window["nunjucks"] === "object") {
            return (_a = window["nunjucks"]) === null || _a === void 0 ? void 0 : _a.render(templateName, context);
        }
        return null;
    };
    return Controller;
}());
exports.default = Controller;
