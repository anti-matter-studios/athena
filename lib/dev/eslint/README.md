# @anti-matter-studios/eslint

Tool used to share eslint configuration across the repository.

## Installation

To add this package to your project within the monorepo, run:

```bash
yarn add @anti-matter-studios/eslint
```

## Usage

This package provides a shared ESLint configuration for consistent code quality across the repository. To use it in your
project, extend the configuration in your `eslint.config.mjs` file:

```js
import { DefaultConfiguration } from "@anti-matter-studios/eslint/config";

export default DefaultConfiguration;
```

### React rules

This package provides a set of rules for linting React code as well.

```js
import { DefaultReactConfiguration } from "@anti-matter-studios/eslint/config";

export default DefaultReactConfiguration;
```

### Custom rules

This package exports a `createESLintConfiguration` signature designed to help you
extend the default configuration if needed.

> [!IMPORTANT]
> You should still extend the default options.

## Features

- Shared ESLint rules to enforce code consistency.
- Compatible with TypeScript and modern JavaScript.
- Includes support for React and React Hooks.
- Integrates with Prettier for code formatting.

## Development

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **Yarn** package manager

### Tests

To verify the configuration, run the linting tests:

```bash
yarn eslint:test
```

or

```bash
yarn eslint:lint
```

### Publishing

This package is published automatically as part of the monorepo workflow.

## Contributing

If you need to modify or add new rules to the shared configuration, follow
the [monorepo's contribution guidelines](../../../README.md).

## License

This project is closed-source. See the [LICENCE](./LICENCE) file for details.
