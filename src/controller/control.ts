import { debug, watchPrefix, watchSuffix } from "../utils";
import { path, middleware, middlewareRecord } from "../types";

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
     * The realpath for the Application
     * 
     * @var string
     */
    protected _realpath: path = "";

    /**
     * Get accessor for realpath
     * 
     * @var path
     */
    public get realpath(): path
    {
        return this._realpath;
    }

    /**
     * Set accessor for realpath
     * 
     * @returns void
     */
    public set realpath(newPath: path)
    {
        this._realpath = newPath;
    }

    /**
     * Watch out for realpath prefix
     * 
     * @var string
     */
    public prefix: string = "/";

    /**
     * Performs redirection and returns the path
     * 
     * @param {string} path - path to redirect to
     * @returns string
     */
    public redirect(path: string): string
    {
        let instance: this = this.getInstance();
        let fullpath: string = watchPrefix(path, instance.prefix);

        if (instance.realpath === fullpath)
        {
            debug("460", "realpath", instance);
        }
        
        return instance.realpath = fullpath;
    }

    
    /**
     * Evaluates one or more middlewares.
     * returns true on success, otherwise false
     * 
     * @param {string|string[]} names - the name of the middleware or a list of names
     * @returns boolean
     */
    public middleware(names: string | string[]): boolean
    {
        if (names.constructor !== Array)
        {
            names = [names as string];
        }

        return names.every((name: string, key: number) => 
            this.getMiddleware(name).call(this.getInstance(), this.getMiddleware(names[key + 1]) || (() => true))
        );
    }

    /**
     * Regiters a middleware into current control and returns new middleware count
     * 
     * @param {string} name - name of the middleware
     * @param {middleware} callback - the function to call once the middleware is activated
     * @returns number
     */
    public registerMiddleware(name: string, callback: middleware): number
    {
        if (typeof name !== "string")
        {
            debug("400", `name: "${name}" must be a string`);
        }

        if (!this.$middlewares)
        {
            this.$middlewares = []
        }
        
        return this.$middlewares.push({ name, callback });
    }

    /**
     * Sets the global instance to a new one
     * 
     * @param {this} instance - the new instance to use
     * @returns instance
     */
    public setInstance(instance?: this): this
    {
        return instance ? this.$instance = instance: null;
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
     * Gets a middleware callback in the global/local instance by its name
     * 
     * @param {string} name - name of the middleware
     * @returns middleware
     */
    protected getMiddleware(name: string): middleware
    {
        let middleware: middleware = null;

        this.$instance?.$middlewares?.forEach(ware => {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });

        this.$middlewares?.forEach(ware => {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });

        return middleware;
    }
}