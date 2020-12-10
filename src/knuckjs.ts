import Route from "./router";
import Controller from "./controller";
import Control from "./controller/control";
import Pathfinder from "./paths";
import Resolver from "./resolve";
import { debug, watchPrefix } from "./utils";
import { routePack, routeCallback } from "./types";

/** Knucks is what handles the rest... */
export = class Knuck extends Control
{
    /**
     * The realpath for the Application
     * 
     * @var string
     */
    public realpath: string = "";

    /**
     * Watch out for realpath prefix
     * 
     * @var string
     */
    public prefix: string = "/";

    /**
     * Provide an easy way to register routes et al.
     * 
     * @param callback 
     * @returns void
     */
    constructor(callback?: (BaseRoute: typeof Route, BaseController: typeof Controller) => any)
    {
        super();

        this.setInstance();

        if (typeof callback === "function")
        {
            callback.apply(this, [Route, Controller])
        }
    }
    
    /**
     * Output the resolved routes
     * 
     * @returns Resolve
     */
    public output(): routePack
    {
        let currentRoute: routePack = null;

        Route.getInstance().all().forEach(route => {
            let path = new Pathfinder(watchPrefix(route.path, this.prefix), this.realpath);
            path.setPatterns(Route.getPatterns());
            if (path.matches())
            {
                currentRoute = { route, path };
            }
        });

        return currentRoute;
    }

    /**
     * Render the current route
     * 
     * @param currentRoute
     * @param callback
     * @returns void
     */
    public render(callback?: routeCallback, currentRoute: routePack = this.output(), forceRender: boolean = false): void
    {
        if ( Route.currentRoute?.path === currentRoute?.route.path && forceRender !== true)
        {
            return null;
        }

        callback = callback || (resolve => {
            if (typeof document === "object") {
                document.write(resolve.content);
            } else {
                console.log(resolve);
            }
        });

        if (typeof callback !== "function")
        {
            debug("19458", "callback", "function");
        }

        if (currentRoute?.path instanceof Pathfinder)
        {
            Route.currentRoute = currentRoute.route;
            callback.apply(this, [new Resolver(currentRoute)]);
        }
    }

    /**
     * Single Page Application output
     * 
     * @param callback
     * @returns void
     */
    public run(callback?: routeCallback): void
    {
        this.render(callback);

        setInterval(() => this.render(callback), 1005);
    }
}