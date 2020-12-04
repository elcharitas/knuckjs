import Chucks from "./dist";

let app = new Chucks(function create(Route){

    this.realpath = "#/home/klo";

    this.prefix = "#";

    Route.pattern('mom', '.*')

    Route.get('/{mom}', function(mo){
        return mo
    });

    this.run();
});