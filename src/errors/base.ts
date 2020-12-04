import { debug, capslock } from "../utils";

export default
    
class BaseError extends Error
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
    public typeCode: number = 400;

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

    /**
     * Sets the error prefix
     * 
     * @param prefix
     * @returns string
     */
    public setPrefix(prefix: string)
    {
        return this.prefix = capslock(prefix);
    }

    /**
     * Sets the value of the error message
     * 
     * @param msg
     * @param args
     * @returns string
     */
    public setMessage(msg: string, args: Array<string|number> = [])
    {
        args.forEach((arg, key) => {
            msg = msg.replace(`%${key}`, arg as string);
        });

        return this.message = `${this.prefix}[${this.typeCode}]: ${msg}. Check "${this.helplink}" for more help`;
    }
}