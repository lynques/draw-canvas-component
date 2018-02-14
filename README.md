# Draw Canvas Component
> An HTML Custom Element for drawing.

[//]: # ([![Build Status][travis-image]][travis-url])
[//]: # ([![Downloads Stats][npm-downloads]][npm-url])
[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/lynques/draw-canvas/tree/master.svg?style=svg)](https://circleci.com/gh/lynques/draw-canvas/tree/master)

Draw Canvas is a work-in-progress custom element to implement drawing functionality using the mouse 
on an HTML Canvas element.

[//]: # (image will go here)

## Installation

npm:

```sh
npm install draw-canvas-component --save
```

## Usage
Register the draw-canvas custom element by pulling in the bundle.js script from node modules.
```html
<script src="node_modules/lynqyes/draw-canvas-component/dist/bundle.js"></script>
```

Add a draw-canvas tag to your markup, providing width and height attributes
- _width_ - Width in pixels of the drawing surface
- _height_ - Height in pixels of the drawing surface

```html
<draw-canvas width="800" height="600"></draw-canvas>
```


## Development setup

To set up for development, clone this repository.

```sh
npm install
npm start
```
Start script will watch for changes inside `src` folder, rebuild and hot reload the example project.
To modify the example project, change `index.html` to your liking, example styles found in `assets/styles.css`.

To run tests including linting

```sh
npm run test:once
```
or
```sh
npm test
```
to watch test files

## Meta

Aaron Romel – [@_lynques](https://twitter.com/_lynques) – lynques.io@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/lynques](https://github.com/lynques/)

## Contributing

1. Fork it (<https://github.com/lynques/draw-canvas-component/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/draw-canvas-component.svg?style=flat-square
[npm-url]: https://npmjs.org/package/draw-canvas-component
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
