import Controller from "./controller";
import Pathfinder from "./paths";
import Resolver from "./resolve";

/** Type definition for route callback */
type routeCallback = (resolve: Resolver) => any;

/** Type definition for middleware callback */
type middleware = (next: middleware) => boolean;

/** Type definition for single middleware */
type middlewareRecord = { name: string, callback: middleware };

/** Type definition for single route */
type route = { path: string, method: string, controller?: Controller, callback?: routeCallback };

/** Type definition for route packs */
type routePack = { route: route, path: Pathfinder };

/** Type definition for list of routes */
type routeList = Array<route>;

/** Type definition for route paterns */
type routePattern = { name: string, pattern: string }

/** Type definition for list of patterns */
type routePatternList = Array<routePattern>

export {
    route,
    routeList,
    routePack,
    routeCallback,
    routePattern,
    routePatternList,
    middleware,
    middlewareRecord
}