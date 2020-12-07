import Knuck from "./lib/knuckjs";

let app = new Knuck(function create(Route){
    // original path
    this.realpath = "/";
    // KnuckJS supports patterns!
    Route.pattern('id', '.*');

    // testing redirection...
    Route.get('/', () => {
        // redirect the app
        this.realpath = "/page";
        //this text won't show on fast networks
        return "Redirecting...";
    });

    Route.get('/home', function () {
        return "Hello Knuck!"
    });

    this.run();
});