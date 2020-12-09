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
     * @var Route
     */
    protected static $instance: any;

    /**
     * Returns null when not routed
     * 
     * @var route
     */
    public static currentRoute: route = null;

    /**
     * Constructor for singleton routes class
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
    public static getInstance()
    {
        if (!this.$instance) {
            this.$instance = new this;
        }

        return this.$instance;
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