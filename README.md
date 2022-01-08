# Draw Canvas Component
> An HTML Custom Element for drawing.

[//]: # ([![Build Status][travis-image]][travis-url])
[//]: # ([![Downloads Stats][npm-downloads]][npm-url])
[![NPM Version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/lynques/draw-canvas-component/tree/master.svg?style=svg)](https://circleci.com/gh/lynques/draw-canvas/tree/main)

Draw Canvas is a custom element that implements a resizeable HTML canvas with drawing functionality built in.
Unlike the standard HTML5 canvas element, the draw-canvas component's size is determined by the css applied to the element, and the component can resize
without losing any of the data drawn to the canvas.

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

Add a draw-canvas tag to your markup
```html
<draw-canvas></draw-canvas>
```
### Attributes
- _strokeColor_ - Color of draw stroke (default: #000)
- _strokeWeight_ - Thickness of draw stroke (default: 1)

> Providing attributes in tag is optional
```html
<draw-canvas stroke-color="#f00" stroke-weight="3"></draw-canvas>
```
> Can also be set using javascript.
```js
var drawCanvas = document.querySelector('draw-canvas');
drawCanvas.strokeColor = '#f00';  // draw in red
drawCanvas.strokeWeight = 3;      // 3px stroke weight
```

### Helper Methods
- _clear_ - Clears canvas content
```js
drawCanvas.clear();
```

### Styling Caveat
The default display value for the component is `display: block` and can only be overridden using `!important`, but the component will collapse if given a value of `display: inline`.

## Browser Support
Custom elements are not supported by all browsers (https://caniuse.com/#feat=custom-elements). There are polyfills available if
support for these browsers is required. Follow the instructions [here](https://www.npmjs.com/package/@webcomponents/custom-elements) for installation and usage of polyfills.
## Development setup

To set up for development, clone this repository.

```sh
npm install
npm start
```
Start script will watch for changes inside `src` folder, rebuild and hot reload the example project.
To modify the example project, change `index.html` to your liking, example styles found in `assets/styles/styles.css`, and some example javascript interactions in `assets/js/index.js`.

> To run tests including linting

```sh
npm run test
```

## Meta

Aaron Romel – [@_lynques](https://twitter.com/_lynques) – lynques.io@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/lynques](https://github.com/lynques/)

## Contributing

1. Fork it (<https://github.com/lynques/draw-canvas-component/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request against `main` branch

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/draw-canvas-component.svg?style=flat-square
[npm-url]: https://npmjs.org/package/draw-canvas-component
