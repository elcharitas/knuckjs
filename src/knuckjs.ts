import Route from "./router";
import Controller from "./controller";
import Control from "./controller/control";
import Pathfinder from "./paths";
import Resolver from "./resolve";
import * as Util from "./utils";
import { path, routePack, routeCallback } from "./types";

/** Knucks is what handles the rest... */
export = class Knuck extends Control
{
    /**
     * Wick for controlling realpath setting
     * 
     * @var () => path
     */
    protected _pathWick: (newPath: string) => string;

    /**
     * Get accessor for realpath
     * 
     * @var path
     */
    public get realpath() {
        let path: path = this._realpath;

        if (typeof path === "function") {
            path = path.call(this);
        }

        if (!path) {
            return Util.watchSuffix(this.prefix, "/")
        }

        return path;
    }

    /**
     * Set accessor for realpath
     * 
     * @returns void
     */
    public set realpath(newPath: string)
    {
        this._realpath = this._pathWick?.call(this, newPath) || newPath;
    }

    /**
     * Provide an easy way to register routes et al.
     * 
     * @param callback - Called immediately. Takes the Route and controller as arguments for easy use
     * @returns void
     */
    constructor(callback?: (BaseRoute: typeof Route, BaseController: typeof Controller) => any)
    {
        super();

        this.setInstance(this)

        if (typeof callback === "function")
        {
            callback.call(this, Route, Controller)
        }
    }

    /**
     * Exports out the Utils, Route and Controller
     * 
     * @returns object
     */
    public export(): object
    {
        return { Route, Controller, ...Util }
    }
    
    /**
     * Get the current route and returns it pack
     * 
     * @returns routePack
     */
    public currentRoute(): routePack
    {
        return Route.find(this.realpath, this.prefix);
    }

    /**
     * Render the current route once using `callback` unless `forceRender` is set as true
     * 
     * @param callback - This will be called after rendering. Takes the resolver as its only argument
     * @param currentRoute - The current route pack. Defaults to Knuck.currentRoute()
     * @param forceRender - Set as true to forcefully render the current route. Default: false
     * @returns void
     */
    public render(callback?: routeCallback, currentRoute: routePack = this.currentRoute(), forceRender: boolean = false): void
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
            Util.debug("458", "callback", "function");
        }

        if (currentRoute?.path instanceof Pathfinder)
        {
            Route.currentRoute = currentRoute.route;
            callback.apply(this, [ new Resolver(currentRoute, this) ]);
        }
    }

    /**
     * Continuously watch routes and render
     * 
     * @param callback - to be called when rendering
     * @returns void
     */
    public run(callback?: routeCallback): void
    {
        this.render(callback);

        setInterval(() => this.render(callback), 5);
    }

    /**
     * Use to set the realpath and its wick optionally
     * 
     * @param wick - callback to handle realpaths
     * @returns path
     */
    public setWick(wick: path): path
    {
        if (typeof wick === "function") this._pathWick = wick;
        return this._realpath = wick;
    }

    /**
     * Use to set path prefix
     * 
     * @param prefix - string to be prepended to a path if its not there already
     * @returns string
     */
    public setPrefix(prefix: string): string
    {
        return this.prefix = prefix;
    }
}