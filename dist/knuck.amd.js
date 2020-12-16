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
define("errors/base", ["require", "exports", "utils/index"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseError = /** @class */ (function (_super) {
        __extends(BaseError, _super);
        /**
         * Prepares the error message
         *
         * @param {string} msg - the message to output
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
         * @param {string} prefix - the prefix to add to error messages
         * @returns string
         */
        BaseError.prototype.setPrefix = function (prefix) {
            return this.prefix = utils_1.capslock(prefix);
        };
        /**
         * Sets the value of the error message
         *
         * @param {string} msg - the error message which may contain optional flag indexes for formatting e.g %1
         * @param {string[]} args - list of args to use when formating
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
         * Initialize the new error when a wron type or instance is specified for `name`
         *
         * @param {string} name - name of the instance
         * @param {string} type - the expected instance
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
});
define("errors/route", ["require", "exports", "errors/base"], function (require, exports, base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    base_2 = __importDefault(base_2);
    var RouteError = /** @class */ (function (_super) {
        __extends(RouteError, _super);
        /**
         * Initialize the new error when a Route/routepack property is lacking definition
         *
         * @param {string} name - name of the property
         * @param {any} value - the Route/routepack object/class
         * @param {string} type - the type of definition
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
            _super.prototype.setMessage.call(_this, "Route " + name + ": \"" + value[name] + "\" must be " + type);
            return _this;
        }
        /**
         * Type code for the error
         *
         * @var number
         */
        RouteError.typeCode = 19460;
        return RouteError;
    }(base_2.default));
    exports.default = RouteError;
});
define("errors/index", ["require", "exports", "errors/base", "errors/instance", "errors/route"], function (require, exports, base_3, instance_1, route_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RouteError = exports.InstanceError = exports.Error = void 0;
    base_3 = __importDefault(base_3);
    instance_1 = __importDefault(instance_1);
    route_1 = __importDefault(route_1);
    exports.Error = base_3.default;
    exports.InstanceError = instance_1.default;
    exports.RouteError = route_1.default;
});
define("paths/index", ["require", "exports", "utils/index"], function (require, exports, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Path discovery and manager */
    var Pathfinder = /** @class */ (function () {
        /**
         * Discover variables and parse
         *
         * @param {string} path - the route path, which may contain variables describe in braces {myVar}
         * @param {string} realpath - the real path to test for
         */
        function Pathfinder(path, realpath) {
            /**
             * List of parts from realpath
             *
             * @var string[]
             */
            this.$parts = [];
            /**
             * RegExp pattern for matching variables
             *
             * @var RegExp
             */
            this.$regexp = /{([\w\?]+)}/g;
            /**
             * RegExp pattern list for matching variables
             *
             * @var obj
             */
            this.$patterns = {};
            if (typeof path !== "string") {
                utils_2.debug("400", "Invalid Path type, use a string instead");
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
         * @param {string} name - name of the pattern
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
         * Adds a new pattern using `name` and `pattern`
         *
         * @param {string} name - name of the pattern
         * @param {string} pattern - the regexp pattern to index
         * @returns string
         */
        Pathfinder.prototype.setPattern = function (name, pattern) {
            return this.$patterns[name] = pattern;
        };
        /**
         * Import a set of patterns
         *
         * @param {routePatternList} list - list of patterns to inherit
         * @returns boolean
         */
        Pathfinder.prototype.setPatterns = function (list) {
            var _this = this;
            return list.every(function (type) {
                return _this.setPattern(type.name, type.pattern);
            });
        };
        /**
         * Gets a variable from a realpath
         *
         * @param {string} name - name of the variable
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
         * @returns obj
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
         * Sets the parts list using realpath `path`
         *
         * @param {string} path
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
define("resolve/index", ["require", "exports", "controller/index", "paths/index"], function (require, exports, controller_1, paths_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    controller_1 = __importDefault(controller_1);
    paths_1 = __importDefault(paths_1);
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
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/index", ["require", "exports", "errors/index"], function (require, exports, Debugkit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globule = exports.debug = exports.watchSuffix = exports.watchPrefix = exports.capslock = void 0;
    Debugkit = __importStar(Debugkit);
    /** modify window only for types */
    var globule = typeof window === "object" ? window : null;
    exports.globule = globule;
    /**
     * Tentatively capitalize first character of words in `text`
     *
     * @param {string} text - the text to capitalize
     * @param {string} delimiter - the word delimiter defaults to a single whitespace character " "
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
     * Prepend prefix to `text` if not already Prepended
     *
     * @param {string} text - The text to modify
     * @param {string} prefix - the prefix to prepend
     * @returns string
     */
    var watchPrefix = function (text, prefix) {
        if (prefix === void 0) { prefix = ""; }
        if (text.indexOf(prefix) !== 0) {
            return prefix.concat(text);
        }
        return text;
    };
    exports.watchPrefix = watchPrefix;
    /**
     * Append suffix to `text` if not already appended
     *
     * @param {string} text - The text to modify
     * @param {string} suffix - the suffix to append
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
     * @param {string} errorType - The error type code
     * @param {any[]} ...args
     * @returns void
     */
    var debug = function (errorType) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var Debug = Debugkit;
        for (var catcher in Debug) {
            if (globule.KNUCK_DBG !== false && Debug[catcher].typeCode == watchPrefix(errorType, "19") && !(catcher in new Object)) {
                throw new ((_a = Debug[catcher]).bind.apply(_a, __spreadArrays([void 0], args)))();
            }
        }
    };
    exports.debug = debug;
});
define("controller/control", ["require", "exports", "utils/index"], function (require, exports, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**  */
    var Control = /** @class */ (function () {
        function Control() {
            /**
             * The realpath for the Application
             *
             * @var string
             */
            this._realpath = "";
            /**
             * Watch out for realpath prefix
             *
             * @var string
             */
            this.prefix = "/";
        }
        Object.defineProperty(Control.prototype, "realpath", {
            /**
             * Get accessor for realpath
             *
             * @var path
             */
            get: function () {
                return this._realpath;
            },
            /**
             * Set accessor for realpath
             *
             * @returns void
             */
            set: function (newPath) {
                this._realpath = newPath;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Performs redirection and returns the path
         *
         * @param {string} path - path to redirect to
         * @returns string
         */
        Control.prototype.redirect = function (path) {
            var instance = this.getInstance();
            var fullpath = utils_3.watchPrefix(path, instance.prefix);
            if (instance.realpath === fullpath) {
                utils_3.debug("460", "realpath", instance);
            }
            return instance.realpath = fullpath;
        };
        /**
         * Evaluates one or more middlewares.
         * returns true on success, otherwise false
         *
         * @param {string|string[]} names - the name of the middleware or a list of names
         * @returns boolean
         */
        Control.prototype.middleware = function (names) {
            var _this = this;
            if (names.constructor !== Array) {
                names = [names];
            }
            return names.every(function (name, key) {
                return _this.getMiddleware(name).call(_this.getInstance(), _this.getMiddleware(names[key + 1]) || (function () { return true; }));
            });
        };
        /**
         * Regiters a middleware into current control and returns new middleware count
         *
         * @param {string} name - name of the middleware
         * @param {middleware} callback - the function to call once the middleware is activated
         * @returns number
         */
        Control.prototype.registerMiddleware = function (name, callback) {
            if (typeof name !== "string") {
                utils_3.debug("400", "name: \"" + name + "\" must be a string");
            }
            if (!this.$middlewares) {
                this.$middlewares = [];
            }
            return this.$middlewares.push({ name: name, callback: callback });
        };
        /**
         * Sets the global instance to a new one
         *
         * @param {this} instance - the new instance to use
         * @returns instance
         */
        Control.prototype.setInstance = function (instance) {
            return instance ? this.$instance = instance : null;
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
         * Gets a middleware callback in the global/local instance by its name
         *
         * @param {string} name - name of the middleware
         * @returns middleware
         */
        Control.prototype.getMiddleware = function (name) {
            var _a, _b, _c;
            var middleware = null;
            (_b = (_a = this.$instance) === null || _a === void 0 ? void 0 : _a.$middlewares) === null || _b === void 0 ? void 0 : _b.forEach(function (ware) {
                if (ware.name === name) {
                    middleware = ware.callback;
                }
            });
            (_c = this.$middlewares) === null || _c === void 0 ? void 0 : _c.forEach(function (ware) {
                if (ware.name === name) {
                    middleware = ware.callback;
                }
            });
            return middleware;
        };
        return Control;
    }());
    exports.default = Control;
});
define("controller/index", ["require", "exports", "controller/control", "utils/index"], function (require, exports, control_1, utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    control_1 = __importDefault(control_1);
    /** Route Controller is used to define multiple invokable methods for generating response */
    var Controller = /** @class */ (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Method to be called by default
         *
         * @param {any[]} ..._args - Route variables passed to the method
         * @returns string
         */
        Controller.prototype.invoke = function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
            return this.view("index");
        };
        /**
         * Use to render nunjucks templates
         *
         * @param {string} templateName - name of the template
         * @param {object} context - an object of variables to pass into the context
         * @returns string
         */
        Controller.prototype.view = function (templateName, context) {
            var _a;
            if (typeof utils_4.globule === "object" && typeof (utils_4.globule === null || utils_4.globule === void 0 ? void 0 : utils_4.globule.nunjucks) === "object") {
                templateName = utils_4.watchSuffix(templateName, ".njk");
                return (_a = utils_4.globule === null || utils_4.globule === void 0 ? void 0 : utils_4.globule.nunjucks) === null || _a === void 0 ? void 0 : _a.render(templateName, context);
            }
            return null;
        };
        return Controller;
    }(control_1.default));
    exports.default = Controller;
});
define("router/instance", ["require", "exports", "controller/index", "utils/index"], function (require, exports, controller_2, utils_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    controller_2 = __importDefault(controller_2);
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
            if (controllerOrCallback instanceof controller_2.default) {
                var controller = controllerOrCallback;
                this.getInstance().$routes.push({ path: path, controller: controller, method: method });
            }
            else if (typeof controllerOrCallback !== "function") {
                return utils_5.debug("458", "controllerOrCallback", "function");
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
});
define("controller/redirect", ["require", "exports", "controller/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1 = __importDefault(index_1);
    /** Handy controller to handle redirections */
    var RedirectController = /** @class */ (function (_super) {
        __extends(RedirectController, _super);
        /**
         * Takes the path to redirect as argument and saves it
         *
         * @param {string} pathTo - path to redirect to
         * @returns void
         */
        function RedirectController(pathTo) {
            var _this = _super.call(this) || this;
            /**
             * Path to redirect to
             *
             * @var string
             */
            _this.redirectTo = "#";
            _this.redirectTo = pathTo;
            return _this;
        }
        /**
         * Redirect and return path redirecting to
         *
         * @returns string
         */
        RedirectController.prototype.invoke = function () {
            return this.redirect(this.redirectTo);
        };
        return RedirectController;
    }(index_1.default));
    exports.default = RedirectController;
});
define("router/index", ["require", "exports", "router/instance", "controller/redirect", "paths/index", "utils/index"], function (require, exports, instance_2, redirect_1, paths_2, utils_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    instance_2 = __importDefault(instance_2);
    redirect_1 = __importDefault(redirect_1);
    paths_2 = __importDefault(paths_2);
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
            // do nothing...
        }
        /**
         * Handle GET Requests
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        Route.get = function (path, controllerOrCallback) {
            this.register("GET", path, controllerOrCallback);
        };
        /**
         * Handle POST Requests
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        Route.post = function (path, controllerOrCallback) {
            this.register("POST", path, controllerOrCallback);
        };
        /**
         * Handle Redirection from a `path` to a `pathTo`
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {string} pathTo - the path to redirect to
         * @returns void
         */
        Route.redirect = function (path, pathTo) {
            this.get(path, new redirect_1.default(pathTo));
        };
        /**
         * Handle Fallback routes, useful for error pages
         *
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        Route.fallback = function (controllerOrCallback) {
            var patternName = Math.ceil(1000 * Math.random()).toString();
            var path = "/{" + patternName + "}";
            this.pattern(patternName, ".*");
            this.get(path, controllerOrCallback);
        };
        /**
         * Handle GET/POST Requests
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        Route.any = function (path, controllerOrCallback) {
            this.get(path, controllerOrCallback);
            this.post(path, controllerOrCallback);
        };
        /**
         * Find a route that best matches a path using an optional prefix and return the pack
         *
         * @param {string} currentPath - the path to find a match for
         * @param {string} prefix - optional prefix for routes
         * @returns routePack
         */
        Route.find = function (currentPath, prefix) {
            var _this = this;
            var bestMatch = null;
            this.getInstance().all().forEach(function (route) {
                var path = new paths_2.default(utils_6.watchPrefix(route.path, prefix), currentPath);
                path.setPatterns(_this.getPatterns());
                if (path.matches()) {
                    bestMatch = { route: route, path: path };
                }
            });
            return bestMatch;
        };
        /**
         * Create new pattern using `name` and `pattern` and returns its index
         *
         * @param {string} name - name of the pattern
         * @param {string} pattern - the regexp pattern string
         * @returns number - the index of new pattern
         */
        Route.pattern = function (name, pattern) {
            return this.getInstance().$patterns.push({ name: name, pattern: pattern }) - 1;
        };
        /**
         * Returns a list of route Patterns
         *
         * @returns routePatternList
         */
        Route.getPatterns = function () {
            return this.getInstance().$patterns;
        };
        /**
         * Instantiates or returns instance
         *
         * @returns Route
         */
        Route.getInstance = function () {
            return _super.getInstance.call(this);
        };
        return Route;
    }(instance_2.default));
    exports.default = Route;
});
define("knuckjs", ["require", "exports", "router/index", "controller/index", "controller/control", "paths/index", "resolve/index", "utils/index"], function (require, exports, router_1, controller_3, control_2, paths_3, resolve_1, Util) {
    "use strict";
    router_1 = __importDefault(router_1);
    controller_3 = __importDefault(controller_3);
    control_2 = __importDefault(control_2);
    paths_3 = __importDefault(paths_3);
    resolve_1 = __importDefault(resolve_1);
    Util = __importStar(Util);
    return /** @class */ (function (_super) {
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
                callback.call(_this, router_1.default, controller_3.default);
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
            return __assign({ Route: router_1.default, Controller: controller_3.default }, Util);
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
            if ((currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.path) instanceof paths_3.default) {
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
    }(control_2.default));
});
