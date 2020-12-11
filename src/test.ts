import Knuck from "./knuckjs";

let app: Knuck = new Knuck(function create(this: Knuck, Route){
    // original path
    this.realpath = "/";
    // KnuckJS supports patterns!
    Route.pattern('fallback', '.*');

    // testing redirection...
    Route.redirect("/", "/home");

    Route.get('/{fallback}', function (path: string) {
        return `Hello Knuck! Welcome to ${path}`
    });

    this.run();
});