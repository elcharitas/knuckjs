import BaseError from "./base";

export default
    
class InstanceError extends BaseError
{
    /**
     * The type of The Error
     * 
     * @var string
     */
    public type: string = "instance";

    /**
     * Type code for the error
     * 
     * @var number
     */
    public static typeCode: number = 19458;
    public typeCode: number = 19458;

    /**
     * Error prefix for messages
     * 
     * @var string
     */
    public prefix: string = "InstanceError";

    /**
     * Attached helplink for messages
     * 
     * @var string
     */
    public helplink: string = "https://knuck.js.org/guide/errors/instance";

    /**
     * Initialize the new error when a wron type or instance is specified for `name`
     * 
     * @param {string} name - name of the instance
     * @param {string} type - the expected instance
     * @returns void
     */
    constructor(name: string, type: string = "defined")
    {
        super();
        super.setMessage(`${name} must be ${(type !== "defined" ? "of type " : "") + type}`)
    }
}