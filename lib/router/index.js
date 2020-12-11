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
     * @param path
     * @param controllerOrCallback
     * @returns void
     */
    Route.get = function (path, controllerOrCallback) {
        this.register("GET", path, controllerOrCallback);
    };
    /**
     * Handle POST Requests
     *
     * @param path
     * @param controllerOrCallback
     * @returns void
     */
    Route.post = function (path, controllerOrCallback) {
        this.register("POST", path, controllerOrCallback);
    };
    /**
     * Handle Redirection
     *
     * @param path
     * @param pathTo
     * @returns void
     */
    Route.redirect = function (path, pathTo) {
        this.get(path, new redirect_1.default(pathTo));
    };
    /**
     * Handle Fallback routes
     *
     * @param controllerOrCallback
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
     * @param path
     * @param controllerOrCallback
     * @returns void
     */
    Route.any = function (path, controllerOrCallback) {
        this.get(path, controllerOrCallback);
        this.post(path, controllerOrCallback);
    };
    /**
     * Create new pattern
     *
     * @param name
     * @param pattern
     * @returns number
     */
    Route.pattern = function (name, pattern) {
        return this.getInstance().$patterns.push({ name: name, pattern: pattern });
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
