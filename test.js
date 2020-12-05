"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = __importDefault(require("./lib"));
var app = new lib_1.default(function create(Route) {
    var _this = this;
    // original path
    this.realpath = "/";
    // KnuckJS supports patterns!
    Route.pattern('id', '.*');
    // testing redirection...
    Route.get('/', function () {
        // redirect the app
        _this.realpath = "/page";
        //this text won't show on fast networks
        return "Redirecting...";
    });
    Route.get('/home', function () {
        return "Hello Knuck!";
    });
    this.run();
});
