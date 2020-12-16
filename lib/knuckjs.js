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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var control_1 = __importDefault(require("./controller/control"));
var paths_1 = __importDefault(require("./paths"));
var resolve_1 = __importDefault(require("./resolve"));
var Util = __importStar(require("./utils"));
module.exports = /** @class */ (function (_super) {
    __extends(Knuck, _super);
    /**
     * Provide an easy way to register routes et al.
     *
     * @param callback - Called immediately. Takes the Route and controller as arguments for easy use
     * @returns void
     */
    function Knuck(callback) {
        var _this = _super.call(this) || this;
        _this.setInstance(_this);
        if (typeof callback === "function") {
            callback.call(_this, router_1.default, controller_1.default);
        }
        return _this;
    }
    Object.defineProperty(Knuck.prototype, "realpath", {
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
                return Util.watchSuffix(this.prefix, "/");
            }
            return path;
        },
        /**
         * Set accessor for realpath
         *
         * @returns void
         */
        set: function (newPath) {
            var _a;
            this._realpath = ((_a = this._pathWick) === null || _a === void 0 ? void 0 : _a.call(this, newPath)) || newPath;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Exports out the Utils, Route and Controller
     *
     * @returns object
     */
    Knuck.prototype.export = function () {
        return __assign({ Route: router_1.default, Controller: controller_1.default }, Util);
    };
    /**
     * Get the current route and returns it pack
     *
     * @returns routePack
     */
    Knuck.prototype.currentRoute = function () {
        return router_1.default.find(this.realpath, this.prefix);
    };
    /**
     * Render the current route once using `callback` unless `forceRender` is set as true
     *
     * @param callback - This will be called after rendering. Takes the resolver as its only argument
     * @param currentRoute - The current route pack. Defaults to Knuck.currentRoute()
     * @param forceRender - Set as true to forcefully render the current route. Default: false
     * @returns void
     */
    Knuck.prototype.render = function (callback, currentRoute, forceRender) {
        var _a;
        if (currentRoute === void 0) { currentRoute = this.currentRoute(); }
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
            Util.debug("458", "callback", "function");
        }
        if ((currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.path) instanceof paths_1.default) {
            router_1.default.currentRoute = currentRoute.route;
            callback.apply(this, [new resolve_1.default(currentRoute, this)]);
        }
    };
    /**
     * Continuously watch routes and render
     *
     * @param callback - to be called when rendering
     * @returns void
     */
    Knuck.prototype.run = function (callback) {
        var _this = this;
        this.render(callback);
        setInterval(function () { return _this.render(callback); }, 5);
    };
    /**
     * Use to set the realpath and its wick optionally
     *
     * @param wick - callback to handle realpaths
     * @returns path
     */
    Knuck.prototype.setWick = function (wick) {
        if (typeof wick === "function")
            this._pathWick = wick;
        return this._realpath = wick;
    };
    /**
     * Use to set path prefix
     *
     * @param prefix - string to be prepended to a path if its not there already
     * @returns string
     */
    Knuck.prototype.setPrefix = function (prefix) {
        return this.prefix = prefix;
    };
    return Knuck;
}(control_1.default));
