"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var router_1 = __importDefault(require("./router"));
var controller_1 = __importDefault(require("./controller"));
var paths_1 = __importDefault(require("./paths"));
var resolve_1 = __importDefault(require("./resolve"));
var Util = __importStar(require("./utils"));
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
            callback.apply(this, [router_1.default, controller_1.default, Util]);
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
            var path = new paths_1.default(Util.watchPrefix(route.path, _this.prefix), _this.realpath);
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
    Knuck.prototype.render = function (currentRoute, callback) {
        callback = callback || (function (content) {
            if (typeof document === "object") {
                document.write(content);
            }
            else {
                console.log(content);
            }
        });
        if ((currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.path) instanceof paths_1.default) {
            this.route = currentRoute.route;
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
        var currentRoute = this.output();
        this.render(currentRoute, callback);
        setInterval(function () {
            var wakeput = _this.output();
            if ((wakeput === null || wakeput === void 0 ? void 0 : wakeput.route.path) !== (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.route.path)) {
                currentRoute = wakeput;
                _this.render(currentRoute, callback);
            }
        }, 5);
    };
    return Knuck;
}());
