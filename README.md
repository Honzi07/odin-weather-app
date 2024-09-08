# Base Webpack template

## Description

This base template provides a solid foundation for starting new web projects using Webpack. It is designed to simplify the development process by offering a pre-configured environment that includes essential tools for bundling JavaScript, processing CSS, and optimizing assets for production.

## Includes

- .gitignore (node template)
- Webpack
- Css reset
- Base folder structure
- index.js, main.css, reset.css

## Getting Started

1. Clone the repository: `git clone https://github.com/Honzi07/base-webpack-template.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`

## Included Files

#### `index.html`

A basic HTML template that serves as the entry point for the project. It’s configured to work seamlessly with Webpack, automatically injecting the necessary CSS and JS files.

#### `main.css` and `reset.css`

This template includes a [CSS reset by Joshua Comeau](https://www.joshwcomeau.com/css/custom-css-reset/) to ensure consistent styling across browsers. It can be found in the `/src/css/base` directory.

Both `main.css` and `reset.css` are imported in `index.js` for convenience.

## Webpack

This boilerplate includes three config files for different purposes.

### Config files

**webpack.common.js** Dont have to duplicate code within the environment-specific configurations and we can emphasize the DRY principle.

**webpack.dev.js** Features strong source mapping and a localhost server with hot module replacement.

**webpack.prod.js** Generates minified bundles with lighter weight source maps, and optimized assets to improve load time.

## Dependencies Overview

This template includes a set of well-chosen dependencies that streamline development and production processes.

- **Babel**: Transpile modern JavaScript for compatibility.
- **Loaders**: Handles CSS, styles, and HTML imports in your JavaScript.
- **Plugins**: Automates HTML generation, CSS extraction, and CSS minification.
- **Webpack**: Core bundling library with CLI tools and a development server.

Each dependency is pre-configured, for basic use but can customize more for the different use cases.

> Written with [StackEdit](https://stackedit.io/).
