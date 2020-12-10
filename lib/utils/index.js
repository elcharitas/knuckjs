"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.watchSuffix = exports.watchPrefix = exports.capslock = void 0;
var Debugkit = __importStar(require("../errors"));
/**
 * Tentatively capitalize first word in text
 *
 * @param text
 * @param delimiter
 * @returns string
 */
var capslock = function (text, delimiter) {
    if (delimiter === void 0) { delimiter = " "; }
    var words = text.split(delimiter);
    words.forEach(function (word, index) {
        var chars = word.split("");
        chars[0] = chars[0].toUpperCase();
        words[index] = chars.join("");
    });
    return words.join(delimiter);
};
exports.capslock = capslock;
/**
 * Prepend prefix to text if not already Prepended
 *
 * @param text
 * @param prefix
 * @returns string
 */
var watchPrefix = function (text, prefix) {
    if (text.indexOf(prefix) !== 0) {
        return prefix.concat(text);
    }
    return text;
};
exports.watchPrefix = watchPrefix;
/**
 * Append suffix to text if not already appended
 *
 * @param text
 * @param suffix
 * @returns string
 */
var watchSuffix = function (text, suffix) {
    if (text.length !== text.indexOf(suffix) + suffix.length) {
        return text.concat(suffix);
    }
    return text;
};
exports.watchSuffix = watchSuffix;
/**
 * Throw debug informations
 *
 * @param errorType
 * @param args
 * @returns void
 */
var debug = function (errorType) {
    var _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var Debug = Debugkit;
    for (var catcher in Debug) {
        if (Debug[catcher].typeCode == watchPrefix(errorType, "194") && !(catcher in new Object)) {
            throw new ((_a = Debug[catcher]).bind.apply(_a, __spreadArrays([void 0], args)))();
        }
    }
};
exports.debug = debug;
