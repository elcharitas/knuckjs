"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __importDefault(require("../controller"));
var utils_1 = require("../utils");
var RouteInstance = /** @class */ (function () {
    /**
     * Constructor for routes instance
     *
     * @returns void
     */
    function RouteInstance() {
        this.$routes = [];
    }
    /**
     * Returns a list of routes
     *
     * @returns routeList
     */
    RouteInstance.prototype.all = function () {
        return this.$routes;
    };
    /**
     * Instantiates or returns instance
     *
     * @returns Route
     */
    RouteInstance.getInstance = function () {
        if (!this.$instance) {
            this.$instance = new this;
        }
        return this.$instance;
    };
    /**
     * Register new HTTP Requests
     *
     * @param {string} method - the allowed method can be "GET" or "POST"
     * @param {string} path - the path to listen for
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    RouteInstance.register = function (method, path, controllerOrCallback) {
        if (controllerOrCallback instanceof controller_1.default) {
            var controller = controllerOrCallback;
            this.getInstance().$routes.push({ path: path, controller: controller, method: method });
        }
        else if (typeof controllerOrCallback !== "function") {
            return utils_1.debug("458", "controllerOrCallback", "function");
        }
        else {
            var callback = controllerOrCallback;
            this.getInstance().$routes.push({ path: path, callback: callback, method: method });
        }
    };
    /**
     * Returns null when not routed
     *
     * @var route
     */
    RouteInstance.currentRoute = null;
    return RouteInstance;
}());
exports.default = RouteInstance;
