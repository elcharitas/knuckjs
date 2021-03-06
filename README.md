<h1 align="center">👋 KnuckJS</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.1-green.svg?cacheSeconds=2592000" />
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

> KnuckJS is a Simple and lightweight JavaScript Framework to build lightning fast CSRs using any template engine [Learn more](https://knuck.js.org)

## Install

Installing knuckjs is effortless as you can choose to install it as a dependency using npm or yarn

``` bash
npm i knuckjs
---- or ----
yarn add knuckjs
```

or directly include using a CDN like jsDelivr
``` html
<script src="https://cdn.jsdelivr.net/npm/knuckjs@0.1.1/dist/knuck.min.js"></script>
```

## Sample Usage
Here is a sample `Hello Knuck` app. Full documentation is available [here](https://knuck.js.org).
``` ts
// Hello Knuck in Typescript
import Knuck from "knuckjs";

let app: Knuck = new Knuck(function create(Route){
    // tell knuck where to look
    this.realpath = location.pathname;

    // listen for a path
    Route.get('/', function(){
        return "Hello Knuck";
    });

    // let's knuck this app out
    this.run();
});
```

## Author

**[Jonathan Irhodia](https://elcharitas.com.ng)**

* Twitter: [@elcharitas](https://twitter.com/elcharitas)
* Github: [@elcharitas](https://github.com/elcharitas)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/elcharitas/knuckjs/issues). You can also take a look at the [contributing guide](https://github.com/elcharitas/knuckjs/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2020 [Jonathan Irhodia](https://github.com/elcharitas).<br />
This project is [MIT](https://github.com/elcharitas/knuckjs/blob/master/LICENSE) licensed.