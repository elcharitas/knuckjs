import Control from "./control"
import { watchSuffix } from "../utils";

/** Route Controller is used to define multiple invokable methods for generating response */
export default class Controller extends Control
{
    /**
     * Method to be called by default
     * 
     * @returns string
     */
    public invoke(...args): string
    {
        return this.view("index");
    }

    /**
     * Use to render nunjucks templates
     * 
     * @param templateName 
     * @param context
     * @returns string
     */
    public view(templateName: string, context?: object): string
    {
        if (typeof window === "object" && typeof window["nunjucks"] === "object")
        {
            templateName = watchSuffix(templateName, ".njk");
            return window["nunjucks"]?.render(templateName, context);
        }

        return null;
    }
}