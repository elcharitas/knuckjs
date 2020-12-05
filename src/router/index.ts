import Controller from "../controller";
import { debug } from "../utils";

type routeList = Array<{ path: string, method: string, controller?: Controller, callback?: () => any }>;

/** App Route implemntation class */
export default class Route
{
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
    protected $patterns: Array<{ name: string, pattern: string }> = [];

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
    private constructor()
    {
        this.$routes = [];
    }

    /**
     * Returns a list of routes
     * 
     * @returns routeList
     */
    public all(): routeList
    {
        return this.$routes;
    }

    /**
     * Handle GET Requests
     * 
     * @param path 
     * @param controllerOrCallback
     * @returns void
     */
    public static get(path: string, controllerOrCallback: any): void
    {
        this.register("GET", path, controllerOrCallback);
    }

    /**
     * Handle POST Requests
     * 
     * @param path 
     * @param controllerOrCallback
     * @returns void
     */
    public static post(path: string, controllerOrCallback: any): void
    {
        this.register("POST", path, controllerOrCallback);
    }

    /**
     * Handle GET/POST Requests
     * 
     * @param path 
     * @param controllerOrCallback
     * @returns void
     */
    public static any(path: string, controllerOrCallback: any): void
    {
        this.get(path, controllerOrCallback)
        this.post(path, controllerOrCallback);
    }

    /**
     * Create new pattern
     * 
     * @param name 
     * @param pattern
     * @returns number
     */
    public static pattern(name: string, pattern: string): number
    {
        return this.getInstance().$patterns.push({ name, pattern });
    }

    /**
     * Instantiates or returns instance
     * 
     * @returns Route
     */
    public static getInstance()
    {
        if (!this.$instance) {
            this.$instance = new Route;
        }

        return this.$instance;
    }

    /**
     * Returns a list of route Patterns
     * 
     * @returns Array<{ name: string, pattern: string }>
     */
    public static getPatterns(): Array<{ name: string, pattern: string }>
    {
        return this.getInstance().$patterns;
    }

    /**
     * Register new HTTP Requests
     * 
     * @param method
     * @param path 
     * @param controllerOrCallback
     * @returns void
     */
    protected static register(method: string, path: string, controllerOrCallback: any): void
    {
        if (controllerOrCallback instanceof Controller) {
            let controller: Controller = controllerOrCallback;
            this.getInstance().$routes.push({ path, controller, method });
        }
        else if (typeof controllerOrCallback !== "function")
        {
            return debug("19458", "controllerOrCallback", "function");
        }
        else {
            let callback = controllerOrCallback;
            this.getInstance().$routes.push({ path, callback, method });
        }
    }
}