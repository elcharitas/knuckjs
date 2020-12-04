"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Path discovery and manager */
var Pathfinder = /** @class */ (function () {
    /**
     * Discover variables and parse
     *
     * @param path
     */
    function Pathfinder(path, realpath) {
        /**
         * RegExp pattern for matching variables
         *
         * @var RegExp
         */
        this.$regexp = /{([\w\?]+)}/g;
        /**
         * RegExp pattern list for matching variables
         *
         * @var object
         */
        this.$patterns = {};
        this.$vars = path.split("/");
        this.$varNames = this.$regexp.exec(path) || [];
        if (typeof realpath === "string") {
            this.setPath(realpath);
        }
    }
    /**
     * Returns true if realpath and path matches
     *
     * @returns boolean
     */
    Pathfinder.prototype.matches = function () {
        var _this = this;
        var matches = this.$parts.length >= this.$vars.length;
        this.$parts.forEach(function (part, key) {
            var currentVar = _this.$vars[key] || "";
            var partMatch = part.match(_this.regex(currentVar));
            matches = matches && ((currentVar === part) || (partMatch && partMatch.length > 0));
        });
        return matches;
    };
    /**
     * Gets the regex for a pattern name
     *
     * @param name
     * @returns RegExp
     */
    Pathfinder.prototype.regex = function (name) {
        var pattern = "([^\/]+)";
        if (typeof this.$patterns[name] === "string") {
            pattern = this.$patterns[name];
        }
        return new RegExp(pattern);
    };
    /**
     * Adds a new patern
     *
     * @param name
     * @param pattern
     * @returns string
     */
    Pathfinder.prototype.setPattern = function (name, pattern) {
        return this.$patterns[name] = pattern;
    };
    /**
     * Import a set of patterns
     *
     * @param list
     * @returns void
     */
    Pathfinder.prototype.setPatterns = function (list) {
        var _this = this;
        list.forEach(function (type) {
            _this.setPattern(type.name, type.pattern);
        });
    };
    /**
     * Gets a variable from a realpath
     *
     * @param name
     * @returns string
     */
    Pathfinder.prototype.getVar = function (name) {
        var _this = this;
        var index = -1;
        this.$vars.forEach(function ($var, key) {
            var $varExp = _this.$regexp.exec($var) || [];
            if (index === -1 && $varExp.indexOf(name) === 0) {
                index = key;
            }
        });
        return this.$parts[index] || null;
    };
    /**
     * Returns a collection of variables
     *
     * @returns object
     */
    Pathfinder.prototype.getVars = function () {
        var _this = this;
        var $vars = {};
        this.$varNames.forEach(function (name) {
            $vars[name] = _this.getVar(name);
        });
        return $vars;
    };
    /**
     * Returns a list of variables
     *
     * @returns string[]
     */
    Pathfinder.prototype.getVarsList = function () {
        var _this = this;
        var $vars = [];
        this.$varNames.forEach(function (name) {
            $vars.push(_this.getVar(name));
        });
        return $vars;
    };
    /**
     * Sets the parts list
     *
     * @param path
     * @return string[]
     */
    Pathfinder.prototype.setPath = function (path) {
        return this.$parts = path.split("/");
    };
    /**
     * Returns the realpath
     *
     * @returns string
     */
    Pathfinder.prototype.getPath = function () {
        return this.$parts.join("/");
    };
    return Pathfinder;
}());
exports.default = Pathfinder;
