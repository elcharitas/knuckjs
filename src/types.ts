import Controller from "./controller";
import Pathfinder from "./paths";
import Resolver from "./resolve";

/** Type definition for route callback */
type routeCallback = (resolve: Resolver) => any;

/** Type definition for route callback */
type routeHandle = (...args: any[]) => any;

/** Type definition for middleware callback */
type middleware = (next: middleware) => boolean;

/** Type definition for single middleware */
type middlewareRecord = { name: string, callback: middleware };

/** Type definition for single route */
type route = { path: string, method: string, controller?: Controller, callback?: routeHandle };

/** Type definition for route packs */
type routePack = { route: route, path: Pathfinder };

/** Type definition for list of routes */
type routeList = Array<route>;

/** Type definition for route paterns */
type routePattern = { name: string, pattern: string };

/** Type definition for list of patterns */
type routePatternList = Array<routePattern>;

/** Type definition for nunjucks.render */
type nunjucksRender = (name: string, context: object) => string;

/** Type definition for custom window globals */
type customGlobals = { nunjucks?: { render: nunjucksRender} };

/** Modified window object */
type globule = Window & typeof globalThis & customGlobals;

/** Object interface for string indexes */
interface obj extends Object
{
    [x: string]: any
}

export {
    route,
    routeList,
    routePack,
    routeHandle,
    routeCallback,
    routePattern,
    routePatternList,
    middleware,
    middlewareRecord,
    globule,
    obj
}