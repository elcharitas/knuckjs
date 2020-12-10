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
         * @param msg
         * @returns void
         */
        constructor(msg?: string);
        /**
         * Sets the error prefix
         *
         * @param prefix
         * @returns string
         */
        setPrefix(prefix: string): string;
        /**
         * Sets the value of the error message
         *
         * @param msg
         * @param args
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
         * Initialize the new error
         *
         * @param name
         * @param type
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
         * Initialize the new error
         *
         * @param name
         * @param type
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
         * @param path
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
         * @param name
         * @returns RegExp
         */
        regex(name: string): RegExp;
        /**
         * Adds a new patern
         *
         * @param name
         * @param pattern
         * @returns string
         */
        setPattern(name: string, pattern: string): string;
        /**
         * Import a set of patterns
         *
         * @param list
         * @returns void
         */
        setPatterns(list: routePatternList): void;
        /**
         * Gets a variable from a realpath
         *
         * @param name
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
         * Sets the parts list
         *
         * @param path
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
         * Receive currentRoute and Handles it
         *
         * @param currentRoute
         * @returns void
         */
        constructor(currentRoute: routePack, instance?: any);
    }
}
declare module "types" {
    import Controller from "controller/index";
    import Pathfinder from "paths/index";
    import Resolver from "resolve/index";
    /** Type definition for route callback */
    type routeCallback = (resolve: Resolver) => any;
    /** Type definition for route callback */
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
    type globule = Window & typeof globalThis & customGlobals;
    /** Object interface for string indexes */
    interface obj extends Object {
        [x: string]: any;
    }
    export { route, routeList, routePack, routeHandle, routeCallback, routePattern, routePatternList, middleware, middlewareRecord, globule, obj };
}
declare module "utils/index" {
    /**
     * Tentatively capitalize first word in text
     *
     * @param text
     * @param delimiter
     * @returns string
     */
    let capslock: (text: string, delimiter?: string) => string;
    /**
     * Prepend prefix to text if not already Prepended
     *
     * @param text
     * @param prefix
     * @returns string
     */
    let watchPrefix: (text: string, prefix: string) => string;
    /**
     * Append suffix to text if not already appended
     *
     * @param text
     * @param suffix
     * @returns string
     */
    let watchSuffix: (text: string, suffix: string) => string;
    /**
     * Throw debug informations
     *
     * @param errorType
     * @param args
     * @returns void
     */
    let debug: (errorType: string, ...args: Array<string>) => void;
    export { capslock, watchPrefix, watchSuffix, debug };
}
declare module "controller/control" {
    import { middleware, middlewareRecord } from "types";
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
        realpath: string;
        /**
         * Performs redirection
         *
         * @param path
         * @returns string
         */
        redirect(path: string): string;
        /**
         * Evaluates one or more middlewares.
         * returns true on success, otherwise false
         *
         * @param names
         * @returns boolean
         */
        middleware(names: string | string[]): boolean;
        /**
         * Regiters a middleware into current control and returns new middleware count
         *
         * @param name
         * @param callback
         * @returns number
         */
        registerMiddleware(name: string, callback: middleware): number;
        /**
         * Sets the global instance
         *
         * @param instance
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
         * @param name
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
         * @param _args - Route variables passed to the method
         * @returns string
         */
        invoke(..._args: any[]): string;
        /**
         * Use to render nunjucks templates
         *
         * @param templateName
         * @param context
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
         * Constructor for singleton routes class
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
         * @param method
         * @param path
         * @param controllerOrCallback
         * @returns void
         */
        protected static register(method: string, path: string, controllerOrCallback: any): void;
    }
}
declare module "router/index" {
    import RouteInstance from "router/instance";
    import { routePatternList } from "types";
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
         * @param path
         * @param controllerOrCallback
         * @returns void
         */
        static get(path: string, controllerOrCallback: any): void;
        /**
         * Handle POST Requests
         *
         * @param path
         * @param controllerOrCallback
         * @returns void
         */
        static post(path: string, controllerOrCallback: any): void;
        /**
         * Handle GET/POST Requests
         *
         * @param path
         * @param controllerOrCallback
         * @returns void
         */
        static any(path: string, controllerOrCallback: any): void;
        /**
         * Create new pattern
         *
         * @param name
         * @param pattern
         * @returns number
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
    import { routePack, routeCallback } from "types";
    const _default: {
        new (callback?: (BaseRoute: typeof Route, BaseController: typeof Controller) => any): {
            /**
             * The realpath for the Application
             *
             * @var string
             */
            realpath: string;
            /**
             * Watch out for realpath prefix
             *
             * @var string
             */
            prefix: string;
            /**
             * Output the resolved routes
             *
             * @returns Resolve
             */
            output(): routePack;
            /**
             * Render the current route
             *
             * @param currentRoute
             * @param callback
             * @returns void
             */
            render(callback?: routeCallback, currentRoute?: routePack, forceRender?: boolean): void;
            /**
             * Single Page Application output
             *
             * @param callback
             * @returns void
             */
            run(callback?: routeCallback): void;
            $middlewares: import("knuckjs/src/types").middlewareRecord[];
            $instance: any;
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
