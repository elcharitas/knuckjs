import { middleware } from "../types";

export default class Control
{
    protected $middlewares: Array<{ name: string, callback: middleware }>;

    protected $instance: this;

    constructor()
    {
        this.$middlewares = [
            {
                name: 'final',
                callback: (): boolean => {
                    return true;
                }
            }
        ]
    }

    public redirect(path: string): string
    {
        return this.$instance['realpath'] = path;
    }

    public middleware(names: string | string[]): boolean
    {
        if (names.constructor !== Array)
        {
            names = [names as string];
        }

        return names.every((name: string, key: number) => {
            return this.getMiddleware(name)(this.getMiddleware(names[key + 1] || "final"));
        });
    }

    public registerMiddleware(name: string, callback: middleware)
    {
        this.$middlewares.push({ name, callback });
    }

    public setInstance(instance: this): this
    {
        return this.$instance = instance;
    }

    public getInstance(): this
    {
        return this.$instance || this;
    }

    protected getMiddleware(name: string): middleware
    {
        let middleware: middleware;

        this.$middlewares.forEach(ware => {
            if (ware.name === name) {
                middleware = ware.callback;
            }
        });

        return middleware;
    }
}