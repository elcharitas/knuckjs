import Controller from "./index";

/** Handy controller to handle redirections */
export default

class RedirectController extends Controller
{
    /**
     * Path to redirect to
     * 
     * @var string
     */
    private redirectTo: string = "#";

    /**
     * Takes the path to redirect as argument and saves it
     * 
     * @param pathTo
     * @returns void
     */
    constructor(pathTo: string)
    {
        super();

        this.redirectTo = pathTo;
    }

    /**
     * Perform the redirection and return path redirecting to
     * 
     * @returns string
     */
    public invoke(): string
    {
        return this.redirect(this.redirectTo)
    }
}