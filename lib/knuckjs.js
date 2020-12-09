"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var router_1 = __importDefault(require("./router"));
var controller_1 = __importDefault(require("./controller"));
var paths_1 = __importDefault(require("./paths"));
var resolve_1 = __importDefault(require("./resolve"));
var utils_1 = require("./utils");
module.exports = /** @class */ (function () {
    /**
     * Provide an easy way to register routes et al.
     *
     * @param callback
     * @returns void
     */
    function Knuck(callback) {
        /**
         * The realpath for the Application
         *
         * @var string
         */
        this.realpath = "";
        /**
         * Watch out for realpath prefix
         *
         * @var string
         */
        this.prefix = "/";
        if (typeof callback === "function") {
            callback.apply(this, [router_1.default, controller_1.default]);
        }
    }
    /**
     * Output the resolved routes
     *
     * @returns Resolve
     */
    Knuck.prototype.output = function () {
        var _this = this;
        var routes = router_1.default.getInstance().all();
        var currentRoute;
        routes.forEach(function (route) {
            var path = new paths_1.default(utils_1.watchPrefix(route.path, _this.prefix), _this.realpath);
            path.setPatterns(router_1.default.getPatterns());
            if (path.matches()) {
                currentRoute = { route: route, path: path };
            }
        });
        return currentRoute || null;
    };
    /**
     * Render the current route
     *
     * @param currentRoute
     * @param callback
     * @returns void
     */
    Knuck.prototype.render = function (callback, currentRoute, forceRender) {
        var _a, _b;
        if (currentRoute === void 0) { currentRoute = this.output(); }
        if (forceRender === void 0) { forceRender = false; }
        if (((_a = router_1.default.currentRoute) === null || _a === void 0 ? void 0 : _a.path) === (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.route.path) && forceRender !== true) {
            utils_1.debug("19460", "path", (_b = router_1.default.currentRoute) === null || _b === void 0 ? void 0 : _b.path);
        }
        callback = callback || (function (resolve) {
            if (typeof document === "object") {
                document.write(resolve.content);
            }
            else {
                console.log(resolve);
            }
        });
        if (typeof callback !== "function") {
            utils_1.debug("19458", "callback", "function");
        }
        if ((currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.path) instanceof paths_1.default) {
            router_1.default.currentRoute = currentRoute.route;
            callback.apply(this, [new resolve_1.default(currentRoute)]);
        }
    };
    /**
     * Single Page Application output
     *
     * @param callback
     * @returns void
     */
    Knuck.prototype.run = function (callback) {
        var _this = this;
        this.render(callback);
        setInterval(function () { return _this.render(callback); }, 5);
    };
    return Knuck;
}());
