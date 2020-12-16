import BaseError from "./base";

export default

    class RouteError extends BaseError {
    /**
     * The type of The Error
     * 
     * @var string
     */
    public type: string = "routes";

    /**
     * Type code for the error
     * 
     * @var number
     */
    public static typeCode: number = 19460;
    public typeCode: number = 19460;

    /**
     * Error prefix for messages
     * 
     * @var string
     */
    public prefix: string = "RouteError";

    /**
     * Attached helplink for messages
     * 
     * @var string
     */
    public helplink: string = "https://knuck.js.org/guide/errors/routes";

    /**
     * Initialize the new error when a Route/routepack property is lacking definition
     * 
     * @param {string} name - name of the property
     * @param {any} value - the Route/routepack object/class
     * @param {string} type - the type of definition
     * @returns void
     */
    constructor(name: string, value: any, type: string = "unique") {
        super();
        super.setMessage(`Route ${name}: "${value[name]}" must be ${type}`)
    }
}