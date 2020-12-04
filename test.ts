import Knuck from "./lib";

let app = new Knuck(function create(Route){

    this.realpath = "/home/test";

    Route.pattern('myVar', '.*');

    Route.get('/{myVar}', function(someVar){
        return someVar;
    });

    this.run();
});