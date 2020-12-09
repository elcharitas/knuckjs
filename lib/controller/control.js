"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Control = /** @class */ (function () {
    function Control() {
        this.$middlewares = [
            {
                name: 'final',
                callback: function () {
                    return true;
                }
            }
        ];
    }
    Control.prototype.redirect = function (path) {
        return this.$instance['realpath'] = path;
    };
    Control.prototype.middleware = function (names) {
        var _this = this;
        if (names.constructor !== Array) {
            names = [names];
        }
        return names.every(function (name, key) {
            return _this.getMiddleware(name)(_this.getMiddleware(names[key + 1] || "final"));
        });
    };
    Control.prototype.registerMiddleware = function (name, callback) {
        this.$middlewares.push({ name: name, callback: callback });
    };
    Control.prototype.setInstance = function (instance) {
        return this.$instance = instance;
    };
    Control.prototype.getInstance = function () {
        return this.$instance || this;
    };
    Control.prototype.getMiddleware = function (name) {
        var middleware;
        this.$middlewares.forEach(function (ware) {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });
        return middleware;
    };
    return Control;
}());
exports.default = Control;
