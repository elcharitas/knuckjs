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
            var path = this._realpath;
            if (typeof path === "function") {
                path = path.call(this);
            }
            if (!path) {
                return utils_1.watchSuffix(this.prefix, "/");
            }
            return path;
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
     * @param path
     * @returns string
     */
    Control.prototype.redirect = function (path) {
        var _a;
        var fullpath = utils_1.watchPrefix(path, (_a = this.$instance) === null || _a === void 0 ? void 0 : _a.prefix);
        if (this.$instance.realpath === fullpath) {
            utils_1.debug("460", "realpath", this.$instance);
        }
        return this.$instance.realpath = fullpath;
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
            return _this.getMiddleware(name).call(_this.getInstance(), _this.getMiddleware(names[key + 1]) || (function () { return true; }));
        });
    };
    /**
     * Regiters a middleware into current control and returns new middleware count
     *
     * @param name
     * @param callback
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
     * Sets the global instance
     *
     * @param instance
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
     * @param name
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
