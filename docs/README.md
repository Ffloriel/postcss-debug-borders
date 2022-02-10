# postcss-debug-borders
![Dependabot](https://img.shields.io/badge/dependabot-enabled-%23024ea4?style=for-the-badge)
![npm](https://img.shields.io/npm/v/@fullhuman/postcss-debug-borders?style=for-the-badge)
![npm](https://img.shields.io/npm/dw/@fullhuman/postcss-debug-borders?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/Ffloriel/postcss-debug-borders?style=for-the-badge)

[PostCSS] plugin to add colored borders around elements.

[PostCSS]: https://github.com/postcss/postcss

## Installation

```
npm i -D @fullhuman/postcss-debug-borders postcss
```

## Usage

```js
const debugBorders = require('@fullhuman/postcss-debug-borders')
postcss([
  debugBorders({
    elements: ['a'],
    color: '#ff0000'
  })
])
```

See [PostCSS] docs for examples for your environment.


## Contributing

Please read [CONTRIBUTING.md](./../../CONTRIBUTING.md) for details on our code of
conduct, and the process for submitting pull requests to us.

## Versioning

postcss-debug-borders use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE](./../../LICENSE) file
for details.