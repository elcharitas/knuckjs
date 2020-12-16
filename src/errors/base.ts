import { debug, capslock } from "../utils";

export default
    
class BaseError extends Error
{
    /**
     * The type of The Error
     * 
     * @var string
     */
    public type: string = "reference";

    /**
     * Type code for the error
     * 
     * @var number
     */
    public static typeCode: number = 19400;
    public typeCode: number = 19400;

    /**
     * Error prefix for messages
     * 
     * @var string
     */
    public prefix: string = "Error";

    /**
     * Attached helplink for messages
     * 
     * @var string
     */
    public helplink: string = "https://knuck.js.org/guide/errors";

    /**
     * Prepares the error message
     * 
     * @param {string} msg - the message to output
     * @returns void
     */
    constructor(msg?: string)
    {
        super(msg);

        this.name = this.prefix + `[${this.typeCode}]`;

        if (typeof msg !== "undefined") {
            this.message = `${msg}.\nCheck "${this.helplink}" for more help!`;
        }
    }

    /**
     * Sets the error prefix
     * 
     * @param {string} prefix - the prefix to add to error messages
     * @returns string
     */
    public setPrefix(prefix: string)
    {
        return this.prefix = capslock(prefix);
    }

    /**
     * Sets the value of the error message
     * 
     * @param {string} msg - the error message which may contain optional flag indexes for formatting e.g %1
     * @param {string[]} args - list of args to use when formating
     * @returns string
     */
    public setMessage(msg: string, args: Array<string|number> = [])
    {
        args.forEach((arg, key) => {
            msg = msg.replace(`%${key}`, arg as string);
        });

        this.name = this.prefix + `[${this.typeCode}]`;

        return this.message = `${msg}.\nCheck "${this.helplink}" for more help!`;
    }
}