import Controller from "../controller";
import { debug } from "../utils";
import { route, routeList } from "../types";

export default class RouteInstance
{
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
    public static currentRoute: route = null;

    /**
     * Constructor for routes instance
     * 
     * @returns void
     */
    public constructor()
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
     * Instantiates or returns instance
     * 
     * @returns Route
     */
    public static getInstance(): any
    {
        if (!this.$instance) {
            this.$instance = new this;
        }

        return this.$instance;
    }

    /**
     * Register new HTTP Requests
     * 
     * @param {string} method - the allowed method can be "GET" or "POST"
     * @param {string} path - the path to listen for
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
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
            return debug("458", "controllerOrCallback", "function");
        }
        else {
            let callback = controllerOrCallback;
            this.getInstance().$routes.push({ path, callback, method });
        }
    }
}