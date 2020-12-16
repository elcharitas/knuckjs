import * as Debugkit from "../errors";
import { obj } from "../types";

/**
 * Tentatively capitalize first character of words in `text`
 * 
 * @param {string} text - the text to capitalize
 * @param {string} delimiter - the word delimiter defaults to a single whitespace character " "
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
 * Prepend prefix to `text` if not already Prepended
 * 
 * @param {string} text - The text to modify
 * @param {string} prefix - the prefix to prepend
 * @returns string
 */
let watchPrefix = (text: string, prefix: string = ""): string => {
    if (text.indexOf(prefix) !== 0)
    {
        return prefix.concat(text);
    }
    return text;
}

/**
 * Append suffix to `text` if not already appended
 * 
 * @param {string} text - The text to modify
 * @param {string} suffix - the suffix to append
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
 * @param {string} errorType - The error type code
 * @param {any[]} ...args
 * @returns void
 */
let debug = (errorType: string, ...args: Array<any>): void => {
    let Debug: obj = Debugkit;
    for (let catcher in Debug)
    {
        if (Debug[catcher].typeCode == watchPrefix(errorType, "19") && !(catcher in new Object))
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