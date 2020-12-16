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
     * The current Controller
     * 
     * @var Controller
     */
    public controller?: Controller;

    /**
     * Receive currentRoute and Handles it
     * 
     * @param {routePack} currentRoute - routePack of current/desired route to resolve
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
            else if ((this.controller = route.controller) instanceof Controller)
            {
                this.controller.setInstance(this.getInstance());
                this.content = this.controller.invoke(...path.getVarsList());
            }
        }
    }
}