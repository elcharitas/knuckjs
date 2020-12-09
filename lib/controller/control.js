"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**  */
var Control = /** @class */ (function () {
    function Control() {
    }
    /**
     * Performs redirection
     *
     * @param path
     * @returns string
     */
    Control.prototype.redirect = function (path) {
        return this.$instance['realpath'] = path;
    };
    /**
     * Evaluates one or more middlewares.
     * returns true on success, otherwise false
     *
     * @param names
     * @returns boolean
     */
    Control.prototype.middleware = function (names) {
        var _this = this;
        if (names.constructor !== Array) {
            names = [names];
        }
        return names.every(function (name, key) {
            return _this.getMiddleware(name)(_this.getMiddleware(names[key + 1] || null) || (function () { return true; }));
        });
    };
    /**
     * Regiters a middleware into current control
     *
     * @param name
     * @param callback
     * @returns void
     */
    Control.prototype.registerMiddleware = function (name, callback) {
        if (typeof name !== "string") {
            utils_1.debug("19400", "name: \"" + name + "\" must be a string");
        }
        if (!this.$middlewares) {
            this.$middlewares = [];
        }
        this.$middlewares.push({ name: name, callback: callback });
    };
    /**
     * Sets the global instance
     *
     * @param instance
     * @returns instance
     */
    Control.prototype.setInstance = function (instance) {
        return this.$instance = instance;
    };
    /**
     * Gets the global instance
     *
     * @returns instance
     */
    Control.prototype.getInstance = function () {
        return this.$instance || this;
    };
    /**
     * Gets a middleware callback by its name
     *
     * @param name
     * @returns middleware
     */
    Control.prototype.getMiddleware = function (name) {
        var _a;
        var middleware = null;
        (_a = this.$middlewares) === null || _a === void 0 ? void 0 : _a.forEach(function (ware) {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });
        return middleware;
    };
    return Control;
}());
exports.default = Control;
