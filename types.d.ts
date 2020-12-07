declare module "controller/index" {
    export default class Controller {
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
declare module "errors/index" {
    import BaseError from "errors/base";
    import InstanceError from "errors/instance";
    /** The complete error types */
    export { BaseError as Error, InstanceError, };
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
     * Throw debug informations
     *
     * @param errorType
     * @param args
     * @returns void
     */
    let debug: (errorType: string, ...args: Array<string>) => void;
    export { capslock, watchPrefix, debug };
}
declare module "router/index" {
    import Controller from "controller/index";
    type routeList = Array<{
        path: string;
        method: string;
        controller?: Controller;
        callback?: () => any;
    }>;
    /** App Route implemntation class */
    export default class Route {
        /**
         * The Instance of Route
         *
         * @var Route
         */
        protected $routes: routeList;
        /**
         * Patterns for Application's routes
         *
         * @var Array<{ name: string, pattern: string }>
         */
        protected $patterns: Array<{
            name: string;
            pattern: string;
        }>;
        /**
         * The Instance of Route
         *
         * @var Route
         */
        protected static $instance: Route;
        /**
         * Constructor for singleton routes class
         *
         * @returns void
         */
        private constructor();
        /**
         * Returns a list of routes
         *
         * @returns routeList
         */
        all(): routeList;
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
         * Instantiates or returns instance
         *
         * @returns Route
         */
        static getInstance(): Route;
        /**
         * Returns a list of route Patterns
         *
         * @returns Array<{ name: string, pattern: string }>
         */
        static getPatterns(): Array<{
            name: string;
            pattern: string;
        }>;
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
declare module "paths/index" {
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
         * @var object
         */
        protected $patterns: object;
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
        setPatterns(list: Array<{
            name: string;
            pattern: string;
        }>): void;
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
         * @returns object
         */
        getVars(): object;
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
    import Pathfinder from "paths/index";
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
         */
        constructor(currentRoute: {
            route: any;
            path: Pathfinder;
        });
    }
}
declare module "knuckjs" {
    import Pathfinder from "paths/index";
    import Resolver from "resolve/index";
    const _default: {
        new (callback?: (Route: any, Controller: any, Util: object) => any): {
            /**
             * The Current Route object
             *
             * @var object
             */
            route: object;
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
            output(): {
                route: any;
                path: Pathfinder;
            };
            /**
             * Render the current route
             *
             * @param currentRoute
             * @param callback
             * @returns void
             */
            render(currentRoute: any, callback?: (resolve: Resolver) => any): void;
            /**
             * Single Page Application output
             *
             * @param callback
             * @returns void
             */
            run(callback?: (resolve: Resolver) => any): void;
        };
    };
    /** Knucks is what handles the rest... */
    export = _default;
}
