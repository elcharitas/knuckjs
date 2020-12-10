import Controller from "../controller";
import Pathfinder from "../paths";
import { routePack } from "../types";

export default

class Resolver extends Controller
{
    /**
     * Route specific received response
     * 
     * @var string
     */
    public content: string;

    /**
     * The current path
     * 
     * @var string
     */
    public pathName: string;

    /**
     * Receive currentRoute and Handles it
     * 
     * @param currentRoute
     * @returns void 
     */
    constructor(currentRoute: routePack, instance?: any)
    {
        let { path, route } = currentRoute;

        super();

        this.pathName = path.getPath();

        this.setInstance(instance);

        if (path instanceof Pathfinder)
        {
            if (route.callback)
            {
                this.content = route.callback.apply(this, path.getVarsList());
            }
            else if (route.controller)
            {
                this.content = route.controller.setInstance(this.getInstance()).invoke(...path.getVarsList());
            }
        }
    }
}