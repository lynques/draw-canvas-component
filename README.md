# Draw Canvas Component
> An HTML Custom Element for drawing.

[//]: # ([![Build Status][travis-image]][travis-url])
[//]: # ([![Downloads Stats][npm-downloads]][npm-url])
[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/lynques/draw-canvas/tree/master.svg?style=svg)](https://circleci.com/gh/lynques/draw-canvas/tree/master)

Draw Canvas is a work-in-progress custom element to implement drawing functionality using the mouse 
on an HTML Canvas element.

> [Try Demo](https://lynques.github.io/draw-canvas-component/)

[//]: # (image will go here)

## Installation

npm:

```sh
npm install draw-canvas-component --save
```

## Usage
Register the draw-canvas custom element by pulling in the bundle.js script from node modules.
```html
<script src="node_modules/draw-canvas-component/dist/bundle.js"></script>
```

Add a draw-canvas tag to your markup, providing width and height attributes
### Required Attributes
- _width_ - Width in pixels of the drawing surface
- _height_ - Height in pixels of the drawing surface

```html
<draw-canvas width="800" height="600"></draw-canvas>
```

### Other Attributes
- _strokeColor_ - Color of draw stroke
- _strokeWeight_ - Thickness of draw stroke

```javascript
var drawCanvas = document.querySelector('draw-canvas');
drawCanvas.strokeColor = '#f00';  // draw in red
drawCanvas.strokeWeight = 3;      // 3px stroke weight
```

### Helper Methods
- _clear_ - Clears canvas content
```javascript
drawCanvas.clear();
```

## Browser Support
Custom elements are not supported by all browsers (https://caniuse.com/#feat=custom-elements). There are polyfills available if
support for these browsers is required.

Installing polyfill:
```sh
npm install @webcomponents/custom-elements --save
```

Add polyfill as script tag:
```html
<script src="node_modules/@webcomponents/custom-elements/custom-elements.min.js"></script>
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
