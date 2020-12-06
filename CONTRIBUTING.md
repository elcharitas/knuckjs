# KnuckJS Contributing guide

## General Guielines
- Ensure each contributions you make are of the right type i.e either of issues, features, documetation edits and development/pull requests.

- Always refer first to existing issues and/or requests to check if your desired featureor issue has been addressed. In cases whereby its still in process consider contributing to that rather than creating a new one.

- If you are simply trying to change something trivial in the source code such as one or two lines of code consider creating a feature request  instead.

## Issue Reporting Guidelines
- Always denote issues with appropiate prefixes such as
    * **Core**: For issues with the Knuck Class
    * **Route**: For issues with routes
    * **Resolve**: For issues with Resolver
    * **Misc**: For other types

- Avoid creating multiple issues of the same title or context

- If you are a developer and intend reporting a bug in the code, you could very well make the adjustments and submit a pr as development of this project is completely free, open and welcomed.

## Development Guidelines
- First using github client or any other tool, clone this repo. This ensures you have the source files in your workspace
    ``` bash
    gh clone elcharitas/knuckjs
    ---- or -----
    git clone https://github.com/elcharitas/knuckjs
    ```

- Install all dependencies. `nunjucks` is optional but installing it would give a nice feel of template rendering by controllers.
    ``` bash
    npm install
    ```

- Upon testing your new contribution, submit a pull request and wait for it to be accepted and included.