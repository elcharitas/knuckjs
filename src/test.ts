import Knuck from "./knuckjs";

let app: Knuck = new Knuck(function create(this: Knuck, Route){
    // original path
    this.realpath = "/";
    // KnuckJS supports patterns!
    Route.pattern('id', '.*');

    // testing redirection...
    Route.redirect("/", "/home");

    Route.get('/home', function () {
        return "Hello Knuck!"
    });

    this.run();
});