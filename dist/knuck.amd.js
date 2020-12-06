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
define("controller/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = /** @class */ (function () {
        function Controller() {
        }
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
                return (_a = window["nunjucks"]) === null || _a === void 0 ? void 0 : _a.render(templateName, context);
            }
            return null;
        };
        return Controller;
    }());
    exports.default = Controller;
});
define("errors/base", ["require", "exports", "utils/index"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            _this.type = "ref";
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
            _this.helplink = "https://knuck.js.org/errors";
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
});
define("errors/instance", ["require", "exports", "errors/base"], function (require, exports, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_1 = __importDefault(base_1);
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
            _this.type = "ref";
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
            _this.helplink = "https://knuck.js.org/errors/instance";
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
});
define("errors/index", ["require", "exports", "errors/base", "errors/instance"], function (require, exports, base_2, instance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstanceError = exports.Error = void 0;
    base_2 = __importDefault(base_2);
    instance_1 = __importDefault(instance_1);
    exports.Error = base_2.default;
    exports.InstanceError = instance_1.default;
});
define("utils/index", ["require", "exports", "errors/index"], function (require, exports, Debug) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.debug = exports.watchPrefix = exports.capslock = void 0;
    Debug = __importStar(Debug);
    /**
     * Tentatively capitalize first word in text
     *
     * @param text
     * @param del
     * @returns string
     */
    var capslock = function (text, del) {
        if (del === void 0) { del = " "; }
        var words = text.split(del);
        words.forEach(function (word, index) {
            var chars = word.split("");
            chars[0] = chars[0].toUpperCase();
            words[index] = chars.join("");
        });
        return words.join(del);
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
        var debugkit;
        for (var catcher in Debug) {
            if (!(catcher in new Object) && Debug[catcher].typeCode == errorType) {
                throw new ((_a = Debug[catcher]).bind.apply(_a, __spreadArrays([void 0], args)))();
            }
        }
    };
    exports.debug = debug;
});
define("router/index", ["require", "exports", "controller/index", "utils/index"], function (require, exports, controller_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    controller_1 = __importDefault(controller_1);
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
                return utils_2.debug("19458", "controllerOrCallback", "function");
            }
            else {
                var callback = controllerOrCallback;
                this.getInstance().$routes.push({ path: path, callback: callback, method: method });
            }
        };
        return Route;
    }());
    exports.default = Route;
});
define("paths/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.$parts.forEach(function (part, key) {
                var _a;
                var currentVar = _this.$vars[key] || "";
                var matchVar = _this.$regexp.exec(currentVar) || [];
                var partMatch = ((_a = part.match(_this.regex(matchVar[0]))) === null || _a === void 0 ? void 0 : _a.length) > 0;
                matches = matches && (currentVar === part || partMatch);
            });
            return matches;
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
});
define("resolve/index", ["require", "exports", "controller/index", "paths/index"], function (require, exports, controller_2, paths_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    controller_2 = __importDefault(controller_2);
    paths_1 = __importDefault(paths_1);
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
    }(controller_2.default));
    exports.default = Resolver;
});
define("index", ["require", "exports", "router/index", "controller/index", "paths/index", "resolve/index", "utils/index"], function (require, exports, router_1, controller_3, paths_2, resolve_1, Util) {
    "use strict";
    router_1 = __importDefault(router_1);
    controller_3 = __importDefault(controller_3);
    paths_2 = __importDefault(paths_2);
    resolve_1 = __importDefault(resolve_1);
    Util = __importStar(Util);
    return /** @class */ (function () {
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
                callback.apply(this, [router_1.default, controller_3.default, Util]);
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
                var path = new paths_2.default(Util.watchPrefix(route.path, _this.prefix), _this.realpath);
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
            callback = callback || (function (resolve) {
                if (typeof document === "object") {
                    document.write(resolve.content);
                }
                else {
                    console.log(resolve);
                }
            });
            if ((currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.path) instanceof paths_2.default) {
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
                var newRoute = _this.output();
                if ((newRoute === null || newRoute === void 0 ? void 0 : newRoute.route.path) !== (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.route.path)) {
                    _this.render(currentRoute = newRoute, callback);
                }
            }, 5);
        };
        return Knuck;
    }());
});
