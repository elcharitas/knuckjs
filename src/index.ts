import Route from "./router";
import Controller from "./controller";
import Pathfinder from "./paths";
import Resolver from "./resolve";
import * as Util from "./utils";

/** Chucks is what handles the rest... */
export default class Knuck
{
    /**
     * The Current Route object
     * 
     * @var object
     */
    public route: object;

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
    constructor(callback?: (Route: any, Controller: any, Util: object) => any)
    {
        if (typeof callback === "function")
        {
            callback.apply(this, [Route, Controller, Util])
        }
    }
    
    /**
     * Output the resolved routes
     * 
     * @returns Resolve
     */
    public output(): { route: any, path: Pathfinder }
    {
        let routes = Route.getInstance().all();
        let currentRoute: { route: any, path: Pathfinder };

        routes.forEach(route => {
            let path = new Pathfinder(Util.watchPrefix(route.path, this.prefix), this.realpath);
            path.setPatterns(Route.getPatterns());
            if(path.matches())
            {
                currentRoute = {route, path};
            }
        });

        return currentRoute || null;
    }

    /**
     * Render the current route
     * 
     * @param currentRoute
     * @param callback
     * @returns void
     */
    public render(currentRoute: any, callback?: (content: any) => any): void
    {
        callback = callback || (content => {
            if (typeof document === "object") {
                document.write(content);
            } else {
                console.log(content);
            }
        });

        if (currentRoute?.path instanceof Pathfinder)
        {
            this.route = currentRoute.route;
            callback.apply(this, [new Resolver(currentRoute)]);
        }
    }

    /**
     * Single Page Application output
     * 
     * @param callback
     * @returns void
     */
    public run(callback?: (content: any) => any): void
    {
        let currentRoute = this.output();

        this.render(currentRoute, callback);

        setInterval(() => {
            let wakeput = this.output();
            if (wakeput?.route.path !== currentRoute?.route.path) {
                currentRoute = wakeput;
                this.render(currentRoute, callback);
            }
        }, 5);
    }
}