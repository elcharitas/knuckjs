import RouteInstance from "./instance";
import RedirectController from "../controller/redirect";
import Pathfinder from "../paths";
import { watchPrefix } from "../utils";
import { routePack, routePatternList } from "../types";

/** App Route implemntation class */
export default

class Route extends RouteInstance
{
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
    protected $patterns: routePatternList = [];

    /**
     * Declaring a private constructor ensures we have a singleton
     * 
     * @returns void
     */
    private constructor()
    {
        super();
        // do nothing...
    }
    
    /**
     * Handle GET Requests
     *
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    public static get(path: string, controllerOrCallback: any): void
    {
        this.register("GET", path, controllerOrCallback);
    }

    /**
     * Handle POST Requests
     *
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    public static post(path: string, controllerOrCallback: any): void
    {
        this.register("POST", path, controllerOrCallback);
    }
    
    /**
     * Handle Redirection from a `path` to a `pathTo`
     * 
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {string} pathTo - the path to redirect to
     * @returns void
     */
    public static redirect(path: string, pathTo: string): void
    {
        this.get(path, new RedirectController(pathTo));
    }

    /**
     * Handle Fallback routes, useful for error pages
     * 
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    public static fallback(controllerOrCallback: any): void
    {
        let patternName: string = Math.ceil(1000 * Math.random()).toString();
        let path: string = `/{${patternName}}`;
        this.pattern(patternName, ".*");
        this.get(path, controllerOrCallback);
    }

    /**
     * Handle GET/POST Requests
     * 
     * @param {string} path - the path to listen for which may contain variables in braces e.g: {myVar}
     * @param {Controller|Function} controllerOrCallback - The initialized controller to use or a callback function
     * @returns void
     */
    public static any(path: string, controllerOrCallback: any): void
    {
        this.get(path, controllerOrCallback)
        this.post(path, controllerOrCallback);
    }

    /**
     * Find a route that best matches a path using an optional prefix and return the pack
     * 
     * @param {string} currentPath - the path to find a match for
     * @param {string} prefix - optional prefix for routes
     * @returns routePack
     */
    public static find(currentPath: string, prefix?: string): routePack
    {
        let bestMatch: routePack = null;

        this.getInstance().all().forEach(route => {
            let path = new Pathfinder(watchPrefix(route.path, prefix), currentPath);
            path.setPatterns(this.getPatterns());
            if (path.matches()) {
                bestMatch = { route, path };
            }
        });

        return bestMatch;
    }

    /**
     * Create new pattern using `name` and `pattern` and returns its index
     * 
     * @param {string} name - name of the pattern
     * @param {string} pattern - the regexp pattern string
     * @returns number - the index of new pattern
     */
    public static pattern(name: string, pattern: string): number
    {
        return this.getInstance().$patterns.push({ name, pattern }) - 1;
    }

    /**
     * Returns a list of route Patterns
     * 
     * @returns routePatternList
     */
    public static getPatterns(): routePatternList
    {
        return this.getInstance().$patterns;
    }

    /**
     * Instantiates or returns instance
     * 
     * @returns Route
     */
    public static getInstance(): Route
    {
        return super.getInstance();
    }
}