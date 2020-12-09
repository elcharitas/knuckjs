import RouteInstance from "./instance";
import { routePatternList } from "../types";

/** App Route implemntation class */
export default

class Route extends RouteInstance
{

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
     * Returns a list of route Patterns
     * 
     * @returns routePatternList
     */
    public static getPatterns(): routePatternList
    {
        return this.getInstance().$patterns;
    }
}