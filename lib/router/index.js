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
var instance_1 = __importDefault(require("./instance"));
var redirect_1 = __importDefault(require("../controller/redirect"));
var paths_1 = __importDefault(require("../paths"));
var utils_1 = require("../utils");
/** App Route implemntation class */
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    /**
     * Declaring a private constructor ensures we have a singleton
     *
     * @returns void
     */
    function Route() {
        var _this = _super.call(this) || this;
        /**
         * Patterns for Application's routes
         *
         * @var routePatternList
         */
        _this.$patterns = [];
        return _this;
        // do nothing...
    }
    /**
     * Handle GET Requests
     *
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    Route.get = function (path, controllerOrCallback) {
        this.register("GET", path, controllerOrCallback);
    };
    /**
     * Handle POST Requests
     *
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    Route.post = function (path, controllerOrCallback) {
        this.register("POST", path, controllerOrCallback);
    };
    /**
     * Handle Redirection from a `path` to a `pathTo`
     *
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {string} pathTo - the path to redirect to
     * @returns void
     */
    Route.redirect = function (path, pathTo) {
        this.get(path, new redirect_1.default(pathTo));
    };
    /**
     * Handle Fallback routes, useful for error pages
     *
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    Route.fallback = function (controllerOrCallback) {
        var patternName = Math.ceil(1000 * Math.random()).toString();
        var path = "/{" + patternName + "}";
        this.pattern(patternName, ".*");
        this.get(path, controllerOrCallback);
    };
    /**
     * Handle GET/POST Requests
     *
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    Route.any = function (path, controllerOrCallback) {
        this.get(path, controllerOrCallback);
        this.post(path, controllerOrCallback);
    };
    /**
     * Find a route that best matches a path using an optional prefix and return the pack
     *
     * @param {string} currentPath - the path to find a match for
     * @param {string} prefix - optional prefix for routes
     * @returns routePack
     */
    Route.find = function (currentPath, prefix) {
        var _this = this;
        var bestMatch = null;
        this.getInstance().all().forEach(function (route) {
            var path = new paths_1.default(utils_1.watchPrefix(route.path, prefix), currentPath);
            path.setPatterns(_this.getPatterns());
            if (path.matches()) {
                bestMatch = { route: route, path: path };
            }
        });
        return bestMatch;
    };
    /**
     * Create new pattern using `name` and `pattern` and returns its index
     *
     * @param {string} name - name of the pattern
     * @param {string} pattern - the regexp pattern string
     * @returns number - the index of new pattern
     */
    Route.pattern = function (name, pattern) {
        return this.getInstance().$patterns.push({ name: name, pattern: pattern }) - 1;
    };
    /**
     * Returns a list of route Patterns
     *
     * @returns routePatternList
     */
    Route.getPatterns = function () {
        return this.getInstance().$patterns;
    };
    /**
     * Instantiates or returns instance
     *
     * @returns Route
     */
    Route.getInstance = function () {
        return _super.getInstance.call(this);
    };
    return Route;
}(instance_1.default));
exports.default = Route;
