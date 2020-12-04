import * as Debug from "../errors";

/**
 * Tentatively capitalize first word in text
 * 
 * @param text 
 * @param del
 * @returns string
 */
let capslock = (text: string, del: string = " "): string => {
    let words: string[] = text.split(del);
    words.forEach((word, index) => {
        let chars: string[] = word.split("");
        chars[0] = chars[0].toUpperCase();
        words[index] = chars.join("");
    });
    return words.join(del);
}

/**
 * Prepend prefix to text if not already Prepended
 * 
 * @param text 
 * @param prefix
 * @returns string
 */
let watchPrefix = (text: string, prefix: string): string => {
    if (text.indexOf(prefix) !== 0)
    {
        return prefix.concat(text);
    }
    return text;
}

/**
 * Throw debug informations
 * 
 * @param errorType 
 * @param args
 * @returns void
 */
let debug = (errorType: string, ...args: Array<string>): void => {
    let debugkit: Debug.Error;
    for (let catcher in Debug)
    {
        if (! (catcher in new Object) && Debug[catcher].typeCode === errorType)
        {
            throw new Debug[catcher](...args);
        }
    }
}

export {
    capslock,
    watchPrefix,
    debug
}