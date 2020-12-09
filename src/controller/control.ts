import { debug } from "../utils";
import { middleware, middlewareRecord } from "../types";

/**  */
export default class Control
{
    /**
     * List of Middleware records
     * 
     * @var middlewareRecord[]
     */
    protected $middlewares: Array<middlewareRecord>;

    /**
     * The definitive global instance
     * 
     * @var this
     */
    protected $instance: this;

    /**
     * Performs redirection
     * 
     * @param path
     * @returns string
     */
    public redirect(path: string): string
    {
        return this.$instance["realpath"] = path;
    }

    
    /**
     * Evaluates one or more middlewares.
     * returns true on success, otherwise false
     * 
     * @param names
     * @returns boolean
     */
    public middleware(names: string | string[]): boolean
    {
        if (names.constructor !== Array)
        {
            names = [names as string];
        }

        return names.every((name: string, key: number) => 
            this.getMiddleware(name)(this.getMiddleware(names[key + 1] || null) || (() => true))
        );
    }

    /**
     * Regiters a middleware into current control
     * 
     * @param name 
     * @param callback
     * @returns void
     */
    public registerMiddleware(name: string, callback: middleware): void
    {
        if (typeof name !== "string")
        {
            debug("19400", `name: "${name}" must be a string`);
        }

        if (!this.$middlewares)
        {
            this.$middlewares = []
        }
        
        this.$middlewares.push({ name, callback });
    }

    /**
     * Sets the global instance
     * 
     * @param instance
     * @returns instance
     */
    public setInstance(instance?: this): this
    {
        return this.$instance = instance || this;
    }

    /**
     * Gets the global instance
     * 
     * @returns instance
     */
    public getInstance(): this
    {
        return this.$instance || this;
    }

    /**
     * Gets a middleware callback by its name
     * 
     * @param name
     * @returns middleware
     */
    protected getMiddleware(name: string): middleware
    {
        let middleware: middleware = null;

        this.$middlewares?.forEach(ware => {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });

        return middleware;
    }
}