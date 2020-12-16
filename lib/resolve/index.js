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
var controller_1 = __importDefault(require("../controller"));
var paths_1 = __importDefault(require("../paths"));
var Resolver = /** @class */ (function (_super) {
    __extends(Resolver, _super);
    /**
     * Receive currentRoute and Handles it
     *
     * @param {routePack} currentRoute - routePack of current/desired route to resolve
     * @returns void
     */
    function Resolver(currentRoute, instance) {
        var _a;
        var _this = this;
        var path = currentRoute.path, route = currentRoute.route;
        _this = _super.call(this) || this;
        _this.pathName = path.getPath();
        _this.setInstance(instance);
        if (path instanceof paths_1.default) {
            if (route.callback) {
                _this.content = route.callback.apply(_this, path.getVarsList());
            }
            else if ((_this.controller = route.controller) instanceof controller_1.default) {
                _this.controller.setInstance(_this.getInstance());
                _this.content = (_a = _this.controller).invoke.apply(_a, path.getVarsList());
            }
        }
        return _this;
    }
    return Resolver;
}(controller_1.default));
exports.default = Resolver;
