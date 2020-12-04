<h1 align="center">👋 KnuckJS</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/elcharitas/knuckjs#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/elcharitas/knuckjs/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/elcharitas/knuckjs/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/elcharitas/knuckjs" />
  </a>
  <a href="https://twitter.com/elcharitas" target="_blank">
    <img alt="Twitter: elcharitas" src="https://img.shields.io/twitter/follow/elcharitas.svg?style=social" />
  </a>
</p>

> KnuckJS is a Simple JavaScript Framework to build lightning fast SPAs using any template engine [Homepage](https://github.com/elcharitas/knuckjs#readme)

## Install

Installing knuckjs is effortless you can choose to install using npm as a dependency
```sh
npm i knuckjs
```
or directly include using jsDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/knuckjs@0.0.1/dist/knuck.min.js"></script>
```

## Sample Usage
Here is a sample Hello world in KnuckJS. Full documentation available here.
```ts
import Knuck from "knuckjs";

let app: Knuck = new Knuck(function create(Route){
    // tell knuck where to look
    this.realpath = location.pathname;

    // listen for a path
    Route.get('/', function(someVar){
        return "Hello World";
    });

    // let's knuck this app out
    this.run();
});
```

## Author

**Jonathan Irhodia**

* Website: elcharitas.com.ng
* Twitter: [@elcharitas](https://twitter.com/elcharitas)
* Github: [@elcharitas](https://github.com/elcharitas)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/elcharitas/knuckjs/issues). You can also take a look at the [contributing guide](https://github.com/elcharitas/knuckjs/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2020 [Jonathan Irhodia](https://github.com/elcharitas).<br />
This project is [MIT](https://github.com/elcharitas/knuckjs/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_