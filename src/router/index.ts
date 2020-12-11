import RouteInstance from "./instance";
import RedirectController from "../controller/redirect";
import { routePatternList } from "../types";

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
     * Handle Redirection
     * 
     * @param path 
     * @param pathTo
     * @returns void
     */
    public static redirect(path: string, pathTo: string): void
    {
        this.get(path, new RedirectController(pathTo));
    }

    /**
     * Handle Fallback routes
     * 
     * @param controllerOrCallback
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