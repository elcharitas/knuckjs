import * as Debugkit from "../errors";
import { obj } from "../types";

/**
 * Tentatively capitalize first word in text
 * 
 * @param text 
 * @param delimiter
 * @returns string
 */
let capslock = (text: string, delimiter: string = " "): string => {
    let words: string[] = text.split(delimiter);
    words.forEach((word, index) => {
        let chars: string[] = word.split("");
        chars[0] = chars[0].toUpperCase();
        words[index] = chars.join("");
    });
    return words.join(delimiter);
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
 * Append suffix to text if not already appended
 * 
 * @param text 
 * @param suffix
 * @returns string
 */
let watchSuffix = (text: string, suffix: string): string => {
    if (text.length !== text.indexOf(suffix) + suffix.length) {
        return text.concat(suffix);
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
    let Debug: obj = Debugkit;
    for (let catcher in Debug)
    {
        if (Debug[catcher].typeCode == watchPrefix(errorType, "194") && !(catcher in new Object))
        {
            throw new Debug[catcher](...args);
        }
    }
}

export {
    capslock,
    watchPrefix,
    watchSuffix,
    debug
}