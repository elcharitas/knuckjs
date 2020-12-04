import BaseError from "./base";

export default
    
class InstanceError extends BaseError
{
    /**
     * The type of The Error
     * 
     * @var string
     */
    public type: string = "ref";

    /**
     * Type code for the error
     * 
     * @var number
     */
    public typeCode: number = 19458;

    /**
     * Error prefix for messages
     * 
     * @var string
     */
    public prefix: string = "";

    /**
     * Attached helplink for messages
     * 
     * @var string
     */
    public helplink: string = "";

    constructor(msg)
    {
        super();
        this.setPrefix("InstanceError");
        this.setMessage(msg);
    }
}