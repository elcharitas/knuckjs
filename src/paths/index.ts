import { debug } from "../utils";
import { obj, routePattern, routePatternList } from "../types";

/** Path discovery and manager */
export default class Pathfinder
{
    /**
     * List of variables from path
     * 
     * @var string[]
     */
    protected $vars: Array<string>;

    /**
     * List of variable names from path
     * 
     * @var string[]
     */
    protected $varNames: Array<string>;

    /**
     * List of parts from realpath
     * 
     * @var string[]
     */
    protected $parts: Array<string> = [];

    /**
     * RegExp pattern for matching variables
     * 
     * @var RegExp
     */
    protected $regexp: RegExp = /{([\w\?]+)}/g;

    /**
     * RegExp pattern list for matching variables
     * 
     * @var obj
     */
    protected $patterns: obj = {};

    /**
     * Discover variables and parse
     * 
     * @param {string} path - the route path, which may contain variables describe in braces {myVar}
     * @param {string} realpath - the real path to test for
     */
    constructor(path: string, realpath?: string)
    {
        if (typeof path !== "string")
        {
            debug("400", "Invalid Path type, use a string instead");
        }
        
        this.$vars = path.split("/");
        this.$varNames = this.$regexp.exec(path) || [];

        if (typeof realpath === "string")
        {
            this.setPath(realpath);
        }
    }

    /**
     * Returns true if realpath and path matches
     * 
     * @returns boolean
     */
    public matches(): boolean
    {
        let matches: boolean = this.$parts.length >= this.$vars.length;

        return matches && this.$parts.every((part, key): boolean => {
            let currentVar: string = this.$vars[key] || "";
            let matchVar: RegExpMatchArray = this.$regexp.exec(currentVar) || [];
            return currentVar === part || part.match(this.regex(matchVar[0]))?.length > 0;
        });
    }
    
    /**
     * Gets the regex for a pattern name
     * 
     * @param {string} name - name of the pattern
     * @returns RegExp
     */
    public regex(name: string): RegExp
    {
        let pattern: string = "([^\/]+)";

        if (typeof name === "undefined")
        {
            return null;
        }

        if (typeof this.$patterns[name] === "string")
        {
            pattern = this.$patterns[name];
        }

        return new RegExp(pattern);
    }

    /**
     * Adds a new pattern using `name` and `pattern`
     * 
     * @param {string} name - name of the pattern
     * @param {string} pattern - the regexp pattern to index
     * @returns string
     */
    public setPattern(name: string, pattern: string): string
    {
        return this.$patterns[name] = pattern;
    }

    /**
     * Import a set of patterns
     * 
     * @param {routePatternList} list - list of patterns to inherit
     * @returns boolean
     */
    public setPatterns(list: routePatternList): boolean
    {
        return list.every((type: routePattern) => 
            this.setPattern(type.name, type.pattern)
        );
    }

    /**
     * Gets a variable from a realpath
     * 
     * @param {string} name - name of the variable
     * @returns string
     */
    public getVar(name: string): string
    {
        let index: number = -1;

        this.$vars.forEach(($var: string, key: number) => {
            let $varExp: string[] = this.$regexp.exec($var) || [];
            if (index === -1 && $varExp.indexOf(name) === 0)
            {
                index = key;
            }
        });

        return this.$parts[index] || null;
    }

    /**
     * Returns a collection of variables
     * 
     * @returns obj
     */
    public getVars(): obj
    {
        let $vars: obj = {};

        this.$varNames.forEach((name: string) => {
            $vars[name] = this.getVar(name);
        });

        return $vars;
    }

    /**
     * Returns a list of variables
     * 
     * @returns string[]
     */
    public getVarsList(): string[]
    {
        let $vars: string[] = [];

        this.$varNames.forEach((name: string) => {
            $vars.push(this.getVar(name));
        });

        return $vars;
    }

    /**
     * Sets the parts list using realpath `path`
     * 
     * @param {string} path
     * @return string[]
     */
    public setPath(path: string): string[]
    {
        return this.$parts = path.split("/");
    }

    /**
     * Returns the realpath
     * 
     * @returns string
     */
    public getPath(): string
    {
        return this.$parts.join("/");
    }
}