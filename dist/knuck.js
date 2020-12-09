(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Knuck = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**  */
var Control = /** @class */ (function () {
    function Control() {
    }
    /**
     * Performs redirection
     *
     * @param path
     * @returns string
     */
    Control.prototype.redirect = function (path) {
        return this.$instance['realpath'] = path;
    };
    /**
     * Evaluates one or more middlewares.
     * returns true on success, otherwise false
     *
     * @param names
     * @returns boolean
     */
    Control.prototype.middleware = function (names) {
        var _this = this;
        if (names.constructor !== Array) {
            names = [names];
        }
        return names.every(function (name, key) {
            return _this.getMiddleware(name)(_this.getMiddleware(names[key + 1] || null) || (function () { return true; }));
        });
    };
    /**
     * Regiters a middleware into current control
     *
     * @param name
     * @param callback
     * @returns void
     */
    Control.prototype.registerMiddleware = function (name, callback) {
        if (typeof name !== "string") {
            utils_1.debug("19400", "name: \"" + name + "\" must be a string");
        }
        if (!this.$middlewares) {
            this.$middlewares = [];
        }
        this.$middlewares.push({ name: name, callback: callback });
    };
    /**
     * Sets the global instance
     *
     * @param instance
     * @returns instance
     */
    Control.prototype.setInstance = function (instance) {
        return this.$instance = instance;
    };
    /**
     * Gets the global instance
     *
     * @returns instance
     */
    Control.prototype.getInstance = function () {
        return this.$instance || this;
    };
    /**
     * Gets a middleware callback by its name
     *
     * @param name
     * @returns middleware
     */
    Control.prototype.getMiddleware = function (name) {
        var _a;
        var middleware = null;
        (_a = this.$middlewares) === null || _a === void 0 ? void 0 : _a.forEach(function (ware) {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });
        return middleware;
    };
    return Control;
}());
exports.default = Control;

},{"../utils":12}],2:[function(require,module,exports){
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
var control_1 = __importDefault(require("./control"));
var utils_1 = require("../utils");
/** Route Controller is used to define multiple invokable methods for generating response */
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Method to be called by default
     *
     * @returns string
     */
    Controller.prototype.invoke = function () {
        return this.view("index");
    };
    /**
     * Use to render nunjucks templates
     *
     * @param templateName
     * @param context
     * @returns string
     */
    Controller.prototype.view = function (templateName, context) {
        var _a;
        if (typeof window === "object" && typeof window["nunjucks"] === "object") {
            templateName = utils_1.watchSuffix(templateName, ".njk");
            return (_a = window["nunjucks"]) === null || _a === void 0 ? void 0 : _a.render(templateName, context);
        }
        return null;
    };
    return Controller;
}(control_1.default));
exports.default = Controller;

},{"../utils":12,"./control":1}],3:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    /**
     * Prepares the error message
     *
     * @param msg
     * @returns void
     */
    function BaseError(msg) {
        var _this = _super.call(this, msg) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "reference";
        _this.typeCode = 19400;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "Error";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "https://knuck.js.org/guide/errors";
        _this.name = _this.prefix + ("[" + _this.typeCode + "]");
        if (typeof msg !== "undefined") {
            _this.message = msg + ".\nCheck \"" + _this.helplink + "\" for more help!";
        }
        return _this;
    }
    /**
     * Sets the error prefix
     *
     * @param prefix
     * @returns string
     */
    BaseError.prototype.setPrefix = function (prefix) {
        return this.prefix = utils_1.capslock(prefix);
    };
    /**
     * Sets the value of the error message
     *
     * @param msg
     * @param args
     * @returns string
     */
    BaseError.prototype.setMessage = function (msg, args) {
        if (args === void 0) { args = []; }
        args.forEach(function (arg, key) {
            msg = msg.replace("%" + key, arg);
        });
        this.name = this.prefix + ("[" + this.typeCode + "]");
        return this.message = msg + ".\nCheck \"" + this.helplink + "\" for more help!";
    };
    /**
     * Type code for the error
     *
     * @var number
     */
    BaseError.typeCode = 19400;
    return BaseError;
}(Error));
exports.default = BaseError;

},{"../utils":12}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteError = exports.InstanceError = exports.Error = void 0;
var base_1 = __importDefault(require("./base"));
exports.Error = base_1.default;
var instance_1 = __importDefault(require("./instance"));
exports.InstanceError = instance_1.default;
var route_1 = __importDefault(require("./route"));
exports.RouteError = route_1.default;

},{"./base":3,"./instance":5,"./route":6}],5:[function(require,module,exports){
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
var base_1 = __importDefault(require("./base"));
var InstanceError = /** @class */ (function (_super) {
    __extends(InstanceError, _super);
    /**
     * Initialize the new error
     *
     * @param name
     * @param type
     * @returns void
     */
    function InstanceError(name, type) {
        if (type === void 0) { type = "defined"; }
        var _this = _super.call(this) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "instance";
        _this.typeCode = 19458;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "InstanceError";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "https://knuck.js.org/guide/errors/instance";
        _super.prototype.setMessage.call(_this, name + " must be " + ((type !== "defined" ? "of type " : "") + type));
        return _this;
    }
    /**
     * Type code for the error
     *
     * @var number
     */
    InstanceError.typeCode = 19458;
    return InstanceError;
}(base_1.default));
exports.default = InstanceError;

},{"./base":3}],6:[function(require,module,exports){
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
var base_1 = __importDefault(require("./base"));
var RouteError = /** @class */ (function (_super) {
    __extends(RouteError, _super);
    /**
     * Initialize the new error
     *
     * @param name
     * @param type
     * @returns void
     */
    function RouteError(name, value, type) {
        if (type === void 0) { type = "unique"; }
        var _this = _super.call(this) || this;
        /**
         * The type of The Error
         *
         * @var string
         */
        _this.type = "routes";
        _this.typeCode = 19460;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        _this.prefix = "RouteError";
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        _this.helplink = "https://knuck.js.org/guide/errors/routes";
        _super.prototype.setMessage.call(_this, "Route " + name + ": \"" + value + "\" must be " + type);
        return _this;
    }
    /**
     * Type code for the error
     *
     * @var number
     */
    RouteError.typeCode = 19460;
    return RouteError;
}(base_1.default));
exports.default = RouteError;

},{"./base":3}],7:[function(require,module,exports){
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

},{"./controller":2,"./paths":8,"./resolve":9,"./router":10,"./utils":12}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/** Path discovery and manager */
var Pathfinder = /** @class */ (function () {
    /**
     * Discover variables and parse
     *
     * @param path
     */
    function Pathfinder(path, realpath) {
        /**
         * RegExp pattern for matching variables
         *
         * @var RegExp
         */
        this.$regexp = /{([\w\?]+)}/g;
        /**
         * RegExp pattern list for matching variables
         *
         * @var object
         */
        this.$patterns = {};
        if (typeof path !== "string") {
            utils_1.debug("19400", "Invalid Path type, use string instead");
        }
        this.$vars = path.split("/");
        this.$varNames = this.$regexp.exec(path) || [];
        if (typeof realpath === "string") {
            this.setPath(realpath);
        }
    }
    /**
     * Returns true if realpath and path matches
     *
     * @returns boolean
     */
    Pathfinder.prototype.matches = function () {
        var _this = this;
        var matches = this.$parts.length >= this.$vars.length;
        return matches && this.$parts.every(function (part, key) {
            var _a;
            var currentVar = _this.$vars[key] || "";
            var matchVar = _this.$regexp.exec(currentVar) || [];
            return currentVar === part || ((_a = part.match(_this.regex(matchVar[0]))) === null || _a === void 0 ? void 0 : _a.length) > 0;
        });
    };
    /**
     * Gets the regex for a pattern name
     *
     * @param name
     * @returns RegExp
     */
    Pathfinder.prototype.regex = function (name) {
        var pattern = "([^\/]+)";
        if (typeof name === "undefined") {
            return null;
        }
        if (typeof this.$patterns[name] === "string") {
            pattern = this.$patterns[name];
        }
        return new RegExp(pattern);
    };
    /**
     * Adds a new patern
     *
     * @param name
     * @param pattern
     * @returns string
     */
    Pathfinder.prototype.setPattern = function (name, pattern) {
        return this.$patterns[name] = pattern;
    };
    /**
     * Import a set of patterns
     *
     * @param list
     * @returns void
     */
    Pathfinder.prototype.setPatterns = function (list) {
        var _this = this;
        list.forEach(function (type) {
            _this.setPattern(type.name, type.pattern);
        });
    };
    /**
     * Gets a variable from a realpath
     *
     * @param name
     * @returns string
     */
    Pathfinder.prototype.getVar = function (name) {
        var _this = this;
        var index = -1;
        this.$vars.forEach(function ($var, key) {
            var $varExp = _this.$regexp.exec($var) || [];
            if (index === -1 && $varExp.indexOf(name) === 0) {
                index = key;
            }
        });
        return this.$parts[index] || null;
    };
    /**
     * Returns a collection of variables
     *
     * @returns object
     */
    Pathfinder.prototype.getVars = function () {
        var _this = this;
        var $vars = {};
        this.$varNames.forEach(function (name) {
            $vars[name] = _this.getVar(name);
        });
        return $vars;
    };
    /**
     * Returns a list of variables
     *
     * @returns string[]
     */
    Pathfinder.prototype.getVarsList = function () {
        var _this = this;
        var $vars = [];
        this.$varNames.forEach(function (name) {
            $vars.push(_this.getVar(name));
        });
        return $vars;
    };
    /**
     * Sets the parts list
     *
     * @param path
     * @return string[]
     */
    Pathfinder.prototype.setPath = function (path) {
        return this.$parts = path.split("/");
    };
    /**
     * Returns the realpath
     *
     * @returns string
     */
    Pathfinder.prototype.getPath = function () {
        return this.$parts.join("/");
    };
    return Pathfinder;
}());
exports.default = Pathfinder;

},{"../utils":12}],9:[function(require,module,exports){
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
     * @param currentRoute
     */
    function Resolver(currentRoute) {
        var _a;
        var _this = this;
        var path = currentRoute.path;
        var route = currentRoute.route;
        _this = _super.call(this) || this;
        _this.pathName = path.getPath();
        if (path instanceof paths_1.default) {
            if (route.callback) {
                _this.content = route.callback.apply(_this, path.getVarsList());
            }
            else if (route.controller) {
                _this.content = (_a = route.controller).invoke.apply(_a, path.getVarsList());
            }
        }
        return _this;
    }
    return Resolver;
}(controller_1.default));
exports.default = Resolver;

},{"../controller":2,"../paths":8}],10:[function(require,module,exports){
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
    return Route;
}(instance_1.default));
exports.default = Route;

},{"./instance":11}],11:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __importDefault(require("../controller"));
var utils_1 = require("../utils");
var RouteInstance = /** @class */ (function () {
    /**
     * Constructor for singleton routes class
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
     * @param method
     * @param path
     * @param controllerOrCallback
     * @returns void
     */
    RouteInstance.register = function (method, path, controllerOrCallback) {
        if (controllerOrCallback instanceof controller_1.default) {
            var controller = controllerOrCallback;
            this.getInstance().$routes.push({ path: path, controller: controller, method: method });
        }
        else if (typeof controllerOrCallback !== "function") {
            return utils_1.debug("19458", "controllerOrCallback", "function");
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

},{"../controller":2,"../utils":12}],12:[function(require,module,exports){
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.watchSuffix = exports.watchPrefix = exports.capslock = void 0;
var Debug = __importStar(require("../errors"));
/**
 * Tentatively capitalize first word in text
 *
 * @param text
 * @param delimiter
 * @returns string
 */
var capslock = function (text, delimiter) {
    if (delimiter === void 0) { delimiter = " "; }
    var words = text.split(delimiter);
    words.forEach(function (word, index) {
        var chars = word.split("");
        chars[0] = chars[0].toUpperCase();
        words[index] = chars.join("");
    });
    return words.join(delimiter);
};
exports.capslock = capslock;
/**
 * Prepend prefix to text if not already Prepended
 *
 * @param text
 * @param prefix
 * @returns string
 */
var watchPrefix = function (text, prefix) {
    if (text.indexOf(prefix) !== 0) {
        return prefix.concat(text);
    }
    return text;
};
exports.watchPrefix = watchPrefix;
/**
 * Append suffix to text if not already appended
 *
 * @param text
 * @param suffix
 * @returns string
 */
var watchSuffix = function (text, suffix) {
    if (text.length !== text.indexOf(suffix) + suffix.length) {
        return text.concat(suffix);
    }
    return text;
};
exports.watchSuffix = watchSuffix;
/**
 * Throw debug informations
 *
 * @param errorType
 * @param args
 * @returns void
 */
var debug = function (errorType) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var catcher in Debug) {
        if (!(catcher in new Object) && Debug[catcher].typeCode == errorType) {
            throw new ((_a = Debug[catcher]).bind.apply(_a, __spreadArrays([void 0], args)))();
        }
    }
};
exports.debug = debug;

},{"../errors":4}]},{},[7])(7)
});
