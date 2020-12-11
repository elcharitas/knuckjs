import Route from "./router";
import Controller from "./controller";
import Control from "./controller/control";
import Pathfinder from "./paths";
import Resolver from "./resolve";
import { debug, watchPrefix } from "./utils";
import { path, routePack, routeCallback } from "./types";

/** Knucks is what handles the rest... */
export = class Knuck extends Control
{
    /**
     * Provide an easy way to register routes et al.
     * 
     * @param callback 
     * @returns void
     */
    constructor(callback?: (BaseRoute: typeof Route, BaseController: typeof Controller) => any)
    {
        super();

        if (typeof callback === "function")
        {
            callback.call(this, Route, Controller)
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
            let path = new Pathfinder(watchPrefix(route.path, this.prefix), this.realpath as string);
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

        callback = callback || ((resolve: Resolver) => {
            if (typeof document === "object") {
                document.write(resolve.content);
            } else {
                console.log(resolve);
            }
        });

        if (typeof callback !== "function")
        {
            debug("458", "callback", "function");
        }

        if (currentRoute?.path instanceof Pathfinder)
        {
            Route.currentRoute = currentRoute.route;
            callback.apply(this, [new Resolver(currentRoute, this)]);
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

    /**
     * Use to set the realpath optionally
     * 
     * @param wick
     * @returns path
     */
    public setWick(wick: path): path
    {
        return this._realpath = wick;
    }

    /**
     * Use to set path prefix
     * 
     * @param prefix
     * @returns string
     */
    public setPrefix(prefix: string): string
    {
        return this.prefix = prefix;
    }
}