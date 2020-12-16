"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/** Path discovery and manager */
var Pathfinder = /** @class */ (function () {
    /**
     * Discover variables and parse
     *
     * @param {string} path - the route path, which may contain variables describe in braces {myVar}
     * @param {string} realpath - the real path to test for
     */
    function Pathfinder(path, realpath) {
        /**
         * List of parts from realpath
         *
         * @var string[]
         */
        this.$parts = [];
        /**
         * RegExp pattern for matching variables
         *
         * @var RegExp
         */
        this.$regexp = /{([\w\?]+)}/g;
        /**
         * RegExp pattern list for matching variables
         *
         * @var obj
         */
        this.$patterns = {};
        if (typeof path !== "string") {
            utils_1.debug("400", "Invalid Path type, use a string instead");
        }
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
        return matches && this.$parts.every(function (part, key) {
            var _a;
            var currentVar = _this.$vars[key] || "";
            var matchVar = _this.$regexp.exec(currentVar) || [];
            return currentVar === part || ((_a = part.match(_this.regex(matchVar[0]))) === null || _a === void 0 ? void 0 : _a.length) > 0;
        });
    };
    /**
     * Gets the regex for a pattern name
     *
     * @param {string} name - name of the pattern
     * @returns RegExp
     */
    Pathfinder.prototype.regex = function (name) {
        var pattern = "([^\/]+)";
        if (typeof name === "undefined") {
            return null;
        }
        if (typeof this.$patterns[name] === "string") {
            pattern = this.$patterns[name];
        }
        return new RegExp(pattern);
    };
    /**
     * Adds a new pattern using `name` and `pattern`
     *
     * @param {string} name - name of the pattern
     * @param {string} pattern - the regexp pattern to index
     * @returns string
     */
    Pathfinder.prototype.setPattern = function (name, pattern) {
        return this.$patterns[name] = pattern;
    };
    /**
     * Import a set of patterns
     *
     * @param {routePatternList} list - list of patterns to inherit
     * @returns boolean
     */
    Pathfinder.prototype.setPatterns = function (list) {
        var _this = this;
        return list.every(function (type) {
            return _this.setPattern(type.name, type.pattern);
        });
    };
    /**
     * Gets a variable from a realpath
     *
     * @param {string} name - name of the variable
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
     * @returns obj
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
     * Sets the parts list using realpath `path`
     *
     * @param {string} path
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
