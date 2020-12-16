declare module "errors/base" {
    export default class BaseError extends Error {
        /**
         * The type of The Error
         *
         * @var string
         */
        type: string;
        /**
         * Type code for the error
         *
         * @var number
         */
        static typeCode: number;
        typeCode: number;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        prefix: string;
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        helplink: string;
        /**
         * Prepares the error message
         *
         * @param {string} msg - the message to output
         * @returns void
         */
        constructor(msg?: string);
        /**
         * Sets the error prefix
         *
         * @param {string} prefix - the prefix to add to error messages
         * @returns string
         */
        setPrefix(prefix: string): string;
        /**
         * Sets the value of the error message
         *
         * @param {string} msg - the error message which may contain optional flag indexes for formatting e.g %1
         * @param {string[]} args - list of args to use when formating
         * @returns string
         */
        setMessage(msg: string, args?: Array<string | number>): string;
    }
}
declare module "errors/instance" {
    import BaseError from "errors/base";
    export default class InstanceError extends BaseError {
        /**
         * The type of The Error
         *
         * @var string
         */
        type: string;
        /**
         * Type code for the error
         *
         * @var number
         */
        static typeCode: number;
        typeCode: number;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        prefix: string;
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        helplink: string;
        /**
         * Initialize the new error when a wron type or instance is specified for `name`
         *
         * @param {string} name - name of the instance
         * @param {string} type - the expected instance
         * @returns void
         */
        constructor(name: string, type?: string);
    }
}
declare module "errors/route" {
    import BaseError from "errors/base";
    export default class RouteError extends BaseError {
        /**
         * The type of The Error
         *
         * @var string
         */
        type: string;
        /**
         * Type code for the error
         *
         * @var number
         */
        static typeCode: number;
        typeCode: number;
        /**
         * Error prefix for messages
         *
         * @var string
         */
        prefix: string;
        /**
         * Attached helplink for messages
         *
         * @var string
         */
        helplink: string;
        /**
         * Initialize the new error when a Route/routepack property is lacking definition
         *
         * @param {string} name - name of the property
         * @param {any} value - the Route/routepack object/class
         * @param {string} type - the type of definition
         * @returns void
         */
        constructor(name: string, value: any, type?: string);
    }
}
declare module "errors/index" {
    import BaseError from "errors/base";
    import InstanceError from "errors/instance";
    import RouteError from "errors/route";
    /** The complete error types */
    export { BaseError as Error, InstanceError, RouteError, };
}
declare module "paths/index" {
    import { obj, routePatternList } from "types";
    /** Path discovery and manager */
    export default class Pathfinder {
        /**
         * List of variables from path
         *
         * @var string[]
         */
        protected $vars: Array<string>;
        /**
         * List of variable names from path
         *
         * @var string[]
         */
        protected $varNames: Array<string>;
        /**
         * List of parts from realpath
         *
         * @var string[]
         */
        protected $parts: Array<string>;
        /**
         * RegExp pattern for matching variables
         *
         * @var RegExp
         */
        protected $regexp: RegExp;
        /**
         * RegExp pattern list for matching variables
         *
         * @var obj
         */
        protected $patterns: obj;
        /**
         * Discover variables and parse
         *
         * @param {string} path - the route path, which may contain variables describe in braces {myVar}
         * @param {string} realpath - the real path to test for
         */
        constructor(path: string, realpath?: string);
        /**
         * Returns true if realpath and path matches
         *
         * @returns boolean
         */
        matches(): boolean;
        /**
         * Gets the regex for a pattern name
         *
         * @param {string} name - name of the pattern
         * @returns RegExp
         */
        regex(name: string): RegExp;
        /**
         * Adds a new pattern using `name` and `pattern`
         *
         * @param {string} name - name of the pattern
         * @param {string} pattern - the regexp pattern to index
         * @returns string
         */
        setPattern(name: string, pattern: string): string;
        /**
         * Import a set of patterns
         *
         * @param {routePatternList} list - list of patterns to inherit
         * @returns boolean
         */
        setPatterns(list: routePatternList): boolean;
        /**
         * Gets a variable from a realpath
         *
         * @param {string} name - name of the variable
         * @returns string
         */
        getVar(name: string): string;
        /**
         * Returns a collection of variables
         *
         * @returns obj
         */
        getVars(): obj;
        /**
         * Returns a list of variables
         *
         * @returns string[]
         */
        getVarsList(): string[];
        /**
         * Sets the parts list using realpath `path`
         *
         * @param {string} path
         * @return string[]
         */
        setPath(path: string): string[];
        /**
         * Returns the realpath
         *
         * @returns string
         */
        getPath(): string;
    }
}
declare module "resolve/index" {
    import Controller from "controller/index";
    import { routePack } from "types";
    export default class Resolver extends Controller {
        /**
         * Route specific received response
         *
         * @var string
         */
        content: string;
        /**
         * The current path
         *
         * @var string
         */
        pathName: string;
        /**
         * The current Controller
         *
         * @var Controller
         */
        controller?: Controller;
        /**
         * Receive currentRoute and Handles it
         *
         * @param {routePack} currentRoute - routePack of current/desired route to resolve
         * @returns void
         */
        constructor(currentRoute: routePack, instance?: any);
    }
}
declare module "types" {
    import Controller from "controller/index";
    import Pathfinder from "paths/index";
    import Resolver from "resolve/index";
    /** Object interface for string indexes */
    interface obj extends Object {
        [x: string]: any;
    }
    /** Type definition for realpaths */
    type path = string | ((path?: string) => string);
    /** Type definition for route callback */
    type routeCallback = (resolve: Resolver) => any;
    /** Type definition for route handlers */
    type routeHandle = (...args: any[]) => any;
    /** Type definition for middleware callback */
    type middleware = (next: middleware) => boolean;
    /** Type definition for single middleware */
    type middlewareRecord = {
        name: string;
        callback: middleware;
    };
    /** Type definition for single route */
    type route = {
        path: string;
        method: string;
        controller?: Controller;
        callback?: routeHandle;
    };
    /** Type definition for route packs */
    type routePack = {
        route: route;
        path: Pathfinder;
    };
    /** Type definition for list of routes */
    type routeList = Array<route>;
    /** Type definition for route paterns */
    type routePattern = {
        name: string;
        pattern: string;
    };
    /** Type definition for list of patterns */
    type routePatternList = Array<routePattern>;
    /** Type definition for nunjucks.render */
    type nunjucksRender = (name: string, context: object) => string;
    /** Type definition for custom window globals */
    type customGlobals = {
        nunjucks?: {
            render: nunjucksRender;
        };
    };
    /** Modified window object */
    type globule = obj & Window & typeof globalThis & customGlobals;
    export { path, route, routeList, routePack, routeHandle, routeCallback, routePattern, routePatternList, middleware, middlewareRecord, globule, obj };
}
declare module "utils/index" {
    import { globule } from "types";
    /** modify window only for types */
    let globule: globule;
    /**
     * Tentatively capitalize first character of words in `text`
     *
     * @param {string} text - the text to capitalize
     * @param {string} delimiter - the word delimiter defaults to a single whitespace character " "
     * @returns string
     */
    let capslock: (text: string, delimiter?: string) => string;
    /**
     * Prepend prefix to `text` if not already Prepended
     *
     * @param {string} text - The text to modify
     * @param {string} prefix - the prefix to prepend
     * @returns string
     */
    let watchPrefix: (text: string, prefix?: string) => string;
    /**
     * Append suffix to `text` if not already appended
     *
     * @param {string} text - The text to modify
     * @param {string} suffix - the suffix to append
     * @returns string
     */
    let watchSuffix: (text: string, suffix: string) => string;
    /**
     * Throw debug informations
     *
     * @param {string} errorType - The error type code
     * @param {any[]} ...args
     * @returns void
     */
    let debug: (errorType: string, ...args: Array<any>) => void;
    export { capslock, watchPrefix, watchSuffix, debug, globule };
}
declare module "controller/control" {
    import { path, middleware, middlewareRecord } from "types";
    /**  */
    export default class Control {
        /**
         * List of Middleware records
         *
         * @var middlewareRecord[]
         */
        protected $middlewares: Array<middlewareRecord>;
        /**
         * The definitive global instance
         *
         * @var this
         */
        protected $instance: this;
        /**
         * The realpath for the Application
         *
         * @var string
         */
        protected _realpath: path;
        /**
         * Get accessor for realpath
         *
         * @var path
         */
        get realpath(): path;
        /**
         * Set accessor for realpath
         *
         * @returns void
         */
        set realpath(newPath: path);
        /**
         * Watch out for realpath prefix
         *
         * @var string
         */
        prefix: string;
        /**
         * Performs redirection and returns the path
         *
         * @param {string} path - path to redirect to
         * @returns string
         */
        redirect(path: string): string;
        /**
         * Evaluates one or more middlewares.
         * returns true on success, otherwise false
         *
         * @param {string|string[]} names - the name of the middleware or a list of names
         * @returns boolean
         */
        middleware(names: string | string[]): boolean;
        /**
         * Regiters a middleware into current control and returns new middleware count
         *
         * @param {string} name - name of the middleware
         * @param {middleware} callback - the function to call once the middleware is activated
         * @returns number
         */
        registerMiddleware(name: string, callback: middleware): number;
        /**
         * Sets the global instance to a new one
         *
         * @param {this} instance - the new instance to use
         * @returns instance
         */
        setInstance(instance?: this): this;
        /**
         * Gets the global instance
         *
         * @returns instance
         */
        getInstance(): this;
        /**
         * Gets a middleware callback in the global/local instance by its name
         *
         * @param {string} name - name of the middleware
         * @returns middleware
         */
        protected getMiddleware(name: string): middleware;
    }
}
declare module "controller/index" {
    import Control from "controller/control";
    /** Route Controller is used to define multiple invokable methods for generating response */
    export default class Controller extends Control {
        /**
         * Method to be called by default
         *
         * @param {any[]} ..._args - Route variables passed to the method
         * @returns string
         */
        invoke(..._args: any[]): string;
        /**
         * Use to render nunjucks templates
         *
         * @param {string} templateName - name of the template
         * @param {object} context - an object of variables to pass into the context
         * @returns string
         */
        view(templateName: string, context?: object): string;
    }
}
declare module "router/instance" {
    import { route, routeList } from "types";
    export default class RouteInstance {
        /**
         * The Instance of Route
         *
         * @var Route
         */
        protected $routes: routeList;
        /**
         * The Instance of Route
         *
         * @var RouteInstance
         */
        protected static $instance: RouteInstance;
        /**
         * Returns null when not routed
         *
         * @var route
         */
        static currentRoute: route;
        /**
         * Constructor for routes instance
         *
         * @returns void
         */
        constructor();
        /**
         * Returns a list of routes
         *
         * @returns routeList
         */
        all(): routeList;
        /**
         * Instantiates or returns instance
         *
         * @returns Route
         */
        static getInstance(): any;
        /**
         * Register new HTTP Requests
         *
         * @param {string} method - the allowed method can be "GET" or "POST"
         * @param {string} path - the path to listen for
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        protected static register(method: string, path: string, controllerOrCallback: any): void;
    }
}
declare module "controller/redirect" {
    import Controller from "controller/index";
    /** Handy controller to handle redirections */
    export default class RedirectController extends Controller {
        /**
         * Path to redirect to
         *
         * @var string
         */
        private redirectTo;
        /**
         * Takes the path to redirect as argument and saves it
         *
         * @param {string} pathTo - path to redirect to
         * @returns void
         */
        constructor(pathTo: string);
        /**
         * Redirect and return path redirecting to
         *
         * @returns string
         */
        invoke(): string;
    }
}
declare module "router/index" {
    import RouteInstance from "router/instance";
    import { routePack, routePatternList } from "types";
    /** App Route implemntation class */
    export default class Route extends RouteInstance {
        /**
         * The Instance of Route
         *
         * @var Route
         */
        protected static $instance: Route;
        /**
         * Patterns for Application's routes
         *
         * @var routePatternList
         */
        protected $patterns: routePatternList;
        /**
         * Declaring a private constructor ensures we have a singleton
         *
         * @returns void
         */
        private constructor();
        /**
         * Handle GET Requests
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        static get(path: string, controllerOrCallback: any): void;
        /**
         * Handle POST Requests
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        static post(path: string, controllerOrCallback: any): void;
        /**
         * Handle Redirection from a `path` to a `pathTo`
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {string} pathTo - the path to redirect to
         * @returns void
         */
        static redirect(path: string, pathTo: string): void;
        /**
         * Handle Fallback routes, useful for error pages
         *
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        static fallback(controllerOrCallback: any): void;
        /**
         * Handle GET/POST Requests
         *
         * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
         * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
         * @returns void
         */
        static any(path: string, controllerOrCallback: any): void;
        /**
         * Find a route that best matches a path using an optional prefix and return the pack
         *
         * @param {string} currentPath - the path to find a match for
         * @param {string} prefix - optional prefix for routes
         * @returns routePack
         */
        static find(currentPath: string, prefix?: string): routePack;
        /**
         * Create new pattern using `name` and `pattern` and returns its index
         *
         * @param {string} name - name of the pattern
         * @param {string} pattern - the regexp pattern string
         * @returns number - the index of new pattern
         */
        static pattern(name: string, pattern: string): number;
        /**
         * Returns a list of route Patterns
         *
         * @returns routePatternList
         */
        static getPatterns(): routePatternList;
        /**
         * Instantiates or returns instance
         *
         * @returns Route
         */
        static getInstance(): Route;
    }
}
declare module "knuckjs" {
    import Route from "router/index";
    import Controller from "controller/index";
    import { path, routePack, routeCallback } from "types";
    const _default: {
        new (callback?: (BaseRoute: typeof Route, BaseController: typeof Controller) => any): {
            /**
             * Wick for controlling realpath setting
             *
             * @var () => path
             */
            _pathWick: (newPath: string) => string;
            /**
             * Get accessor for realpath
             *
             * @var path
             */
            realpath: string;
            /**
             * Exports out the Utils, Route and Controller
             *
             * @returns object
             */
            export(): object;
            /**
             * Get the current route and returns it pack
             *
             * @returns routePack
             */
            currentRoute(): routePack;
            /**
             * Render the current route once using `callback` unless `forceRender` is set as true
             *
             * @param callback - This will be called after rendering. Takes the resolver as its only argument
             * @param currentRoute - The current route pack. Defaults to Knuck.currentRoute()
             * @param forceRender - Set as true to forcefully render the current route. Default: false
             * @returns void
             */
            render(callback?: routeCallback, currentRoute?: routePack, forceRender?: boolean): void;
            /**
             * Continuously watch routes and render
             *
             * @param callback - to be called when rendering
             * @returns void
             */
            run(callback?: routeCallback): void;
            /**
             * Use to set the realpath and its wick optionally
             *
             * @param wick - callback to handle realpaths
             * @returns path
             */
            setWick(wick: path): path;
            /**
             * Use to set path prefix
             *
             * @param prefix - string to be prepended to a path if its not there already
             * @returns string
             */
            setPrefix(prefix: string): string;
            $middlewares: import("knuckjs/src/types").middlewareRecord[];
            $instance: any;
            _realpath: path;
            prefix: string;
            redirect(path: string): string;
            middleware(names: string | string[]): boolean;
            registerMiddleware(name: string, callback: import("knuckjs/src/types").middleware): number;
            setInstance(instance?: any): any;
            getInstance(): any;
            getMiddleware(name: string): import("knuckjs/src/types").middleware;
        };
    };
    /** Knucks is what handles the rest... */
    export = _default;
}
