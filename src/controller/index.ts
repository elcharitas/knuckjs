import Control from "./control"
import { watchSuffix } from "../utils";
import { globule } from "../types";

/** modify window only for types */
let globule: globule = typeof window === "object" ? window: null;

/** Route Controller is used to define multiple invokable methods for generating response */
export default class Controller extends Control
{
    /**
     * Method to be called by default
     * 
     * @param {any[]} ..._args - Route variables passed to the method
     * @returns string
     */
    public invoke(..._args: any[]): string
    {
        return this.view("index");
    }

    /**
     * Use to render nunjucks templates
     * 
     * @param {string} templateName - name of the template
     * @param {object} context - an object of variables to pass into the context
     * @returns string
     */
    public view(templateName: string, context?: object): string
    {
        if (typeof globule === "object" && typeof globule?.nunjucks === "object")
        {
            templateName = watchSuffix(templateName, ".njk");
            return globule?.nunjucks?.render(templateName, context);
        }

        return null;
    }
}