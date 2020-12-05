"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __importDefault(require("../controller"));
var utils_1 = require("../utils");
/** App Route implemntation class */
var Route = /** @class */ (function () {
    /**
     * Constructor for singleton routes class
     *
     * @returns void
     */
    function Route() {
        /**
         * Patterns for Application's routes
         *
         * @var Array<{ name: string, pattern: string }>
         */
        this.$patterns = [];
        this.$routes = [];
    }
    /**
     * Returns a list of routes
     *
     * @returns routeList
     */
    Route.prototype.all = function () {
        return this.$routes;
    };
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
     * Instantiates or returns instance
     *
     * @returns Route
     */
    Route.getInstance = function () {
        if (!this.$instance) {
            this.$instance = new Route;
        }
        return this.$instance;
    };
    /**
     * Returns a list of route Patterns
     *
     * @returns Array<{ name: string, pattern: string }>
     */
    Route.getPatterns = function () {
        return this.getInstance().$patterns;
    };
    /**
     * Register new HTTP Requests
     *
     * @param method
     * @param path
     * @param controllerOrCallback
     * @returns void
     */
    Route.register = function (method, path, controllerOrCallback) {
        if (controllerOrCallback instanceof controller_1.default) {
            var controller = controllerOrCallback;
            this.getInstance().$routes.push({ path: path, controller: controller, method: method });
        }
        else if (typeof controllerOrCallback !== "function") {
            return utils_1.debug("19654", controllerOrCallback, "function");
        }
        else {
            var callback = controllerOrCallback;
            this.getInstance().$routes.push({ path: path, callback: callback, method: method });
        }
    };
    return Route;
}());
exports.default = Route;
