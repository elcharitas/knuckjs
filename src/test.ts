import Knuck from "./knuckjs";

new Knuck(function(this: Knuck, Route){
    // original path
    this.realpath = "/";

    // KnuckJS supports patterns!
    Route.pattern('fallback', '.*');

    // testing redirection...
    Route.redirect("/", "/home");

    // testing fallback
    Route.fallback(function (path: string) {
        return `Hello Knuck! Welcome to ${path}`
    });

    this.run();
});