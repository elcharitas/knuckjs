export default class Controller
{
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
            return window["nunjucks"]?.render(templateName, context);
        }

        return null;
    }
}