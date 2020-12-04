import Controller from "../controller";
import Pathfinder from "../paths";

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
     */
    constructor(currentRoute: {route: any, path: Pathfinder})
    {
        let path = currentRoute.path;

        let route = currentRoute.route;

        super();

        this.pathName = path.getPath();

        if (path instanceof Pathfinder)
        {
            if (route.callback)
            {
                this.content = route.callback.apply(this, path.getVarsList());
            }
            else if (route.controller)
            {
                this.content = route.controller.invoke(...path.getVarsList());
            }
        }
    }
}