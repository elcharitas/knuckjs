"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**  */
var Control = /** @class */ (function () {
    function Control() {
        /**
         * The realpath for the Application
         *
         * @var string
         */
        this._realpath = "";
        /**
         * Watch out for realpath prefix
         *
         * @var string
         */
        this.prefix = "/";
    }
    Object.defineProperty(Control.prototype, "realpath", {
        /**
         * Get accessor for realpath
         *
         * @var path
         */
        get: function () {
            return this._realpath;
        },
        /**
         * Set accessor for realpath
         *
         * @returns void
         */
        set: function (newPath) {
            this._realpath = newPath;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Performs redirection and returns the path
     *
     * @param {string} path - path to redirect to
     * @returns string
     */
    Control.prototype.redirect = function (path) {
        var instance = this.getInstance();
        var fullpath = utils_1.watchPrefix(path, instance.prefix);
        if (instance.realpath === fullpath) {
            utils_1.debug("460", "realpath", instance);
        }
        return instance.realpath = fullpath;
    };
    /**
     * Evaluates one or more middlewares.
     * returns true on success, otherwise false
     *
     * @param {string|string[]} names - the name of the middleware or a list of names
     * @returns boolean
     */
    Control.prototype.middleware = function (names) {
        var _this = this;
        if (names.constructor !== Array) {
            names = [names];
        }
        return names.every(function (name, key) {
            return _this.getMiddleware(name).call(_this.getInstance(), _this.getMiddleware(names[key + 1]) || (function () { return true; }));
        });
    };
    /**
     * Regiters a middleware into current control and returns new middleware count
     *
     * @param {string} name - name of the middleware
     * @param {middleware} callback - the function to call once the middleware is activated
     * @returns number
     */
    Control.prototype.registerMiddleware = function (name, callback) {
        if (typeof name !== "string") {
            utils_1.debug("400", "name: \"" + name + "\" must be a string");
        }
        if (!this.$middlewares) {
            this.$middlewares = [];
        }
        return this.$middlewares.push({ name: name, callback: callback });
    };
    /**
     * Sets the global instance to a new one
     *
     * @param {this} instance - the new instance to use
     * @returns instance
     */
    Control.prototype.setInstance = function (instance) {
        return instance ? this.$instance = instance : null;
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
     * Gets a middleware callback in the global/local instance by its name
     *
     * @param {string} name - name of the middleware
     * @returns middleware
     */
    Control.prototype.getMiddleware = function (name) {
        var _a, _b, _c;
        var middleware = null;
        (_b = (_a = this.$instance) === null || _a === void 0 ? void 0 : _a.$middlewares) === null || _b === void 0 ? void 0 : _b.forEach(function (ware) {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });
        (_c = this.$middlewares) === null || _c === void 0 ? void 0 : _c.forEach(function (ware) {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });
        return middleware;
    };
    return Control;
}());
exports.default = Control;
