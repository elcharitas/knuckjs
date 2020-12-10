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
var router_1 = __importDefault(require("./router"));
var controller_1 = __importDefault(require("./controller"));
var control_1 = __importDefault(require("./controller/control"));
var paths_1 = __importDefault(require("./paths"));
var resolve_1 = __importDefault(require("./resolve"));
var utils_1 = require("./utils");
module.exports = /** @class */ (function (_super) {
    __extends(Knuck, _super);
    /**
     * Provide an easy way to register routes et al.
     *
     * @param callback
     * @returns void
     */
    function Knuck(callback) {
        var _this = _super.call(this) || this;
        /**
         * The realpath for the Application
         *
         * @var string
         */
        _this.realpath = "";
        /**
         * Watch out for realpath prefix
         *
         * @var string
         */
        _this.prefix = "/";
        _this.setInstance();
        if (typeof callback === "function") {
            callback.call(_this, router_1.default, controller_1.default);
        }
        return _this;
    }
    /**
     * Output the resolved routes
     *
     * @returns Resolve
     */
    Knuck.prototype.output = function () {
        var _this = this;
        var currentRoute = null;
        router_1.default.getInstance().all().forEach(function (route) {
            var path = new paths_1.default(utils_1.watchPrefix(route.path, _this.prefix), _this.realpath);
            path.setPatterns(router_1.default.getPatterns());
            if (path.matches()) {
                currentRoute = { route: route, path: path };
            }
        });
        return currentRoute;
    };
    /**
     * Render the current route
     *
     * @param currentRoute
     * @param callback
     * @returns void
     */
    Knuck.prototype.render = function (callback, currentRoute, forceRender) {
        var _a;
        if (currentRoute === void 0) { currentRoute = this.output(); }
        if (forceRender === void 0) { forceRender = false; }
        if (((_a = router_1.default.currentRoute) === null || _a === void 0 ? void 0 : _a.path) === (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.route.path) && forceRender !== true) {
            return null;
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
            utils_1.debug("458", "callback", "function");
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
        setInterval(function () { return _this.render(callback); }, 1005);
    };
    return Knuck;
}(control_1.default));
