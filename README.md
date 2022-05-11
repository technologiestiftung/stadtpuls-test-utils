![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000) ![](https://img.shields.io/badge/node-%3E%3D14-blue.svg) [ ![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg) ](https://github.com/technologiestiftung/stadtpuls-test-utils#readme) [ ![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg) ](https://github.com/technologiestiftung/stadtpuls-test-utils/graphs/commit-activity) [![License: MIT](https://img.shields.io/github/license/technologiestiftung/stadtpuls-test-utils)](https://github.com/technologiestiftung/stadtpuls-test-utils/blob/main/LICENSE)

# Welcome to stadtpuls-test-utils

This repo contains shared test utilities for the [stadtpuls project](https://github.com/technologiestiftung/stadtpuls).

## Prerequisites

- node >=14

## Install

```sh
npm i @technologiestiftung/stadtpuls-test-utils
```

## Usage

### Commonjs

```js
//@ts-check
const {
  closePool,
  openPool,
  getClient,
  execQuery,
} = require("@technologiestiftung/stadtpuls-test-utils");

async function main() {
  await openPool("postgres://postgres:postgres@localhost:5432/postgres");
  const client = await getClient();
  await client.query(
    "CREATE TABLE IF NOT EXISTS test (id serial PRIMARY KEY, name varchar(255))"
  );
  await client.query("INSERT INTO test (name) VALUES ($1)", ["foo"]);
  const result = await client.query("SELECT * FROM test", []);
  // @ts-ignore
  console.log(result.rows);
  await closePool();
}
main().catch(console.error);
```

### Typescript & ESM

```ts
import {
  closePool,
  openPool,
  getClient,
  execQuery,
} from "@technologiestiftung/stadtpuls-test-utils";

async function main() {
  await openPool("postgres://postgres:postgres@localhost:5432/postgres");
  const client = await getClient();
  await client.query(
    "CREATE TABLE IF NOT EXISTS test (id serial PRIMARY KEY, name varchar(255))"
  );
  await client.query("INSERT INTO test (name) VALUES ($1)", ["foo"]);
  const result = await client.query("SELECT * FROM test", []);
  // @ts-ignore
  console.log(result.rows);
  await closePool();
}
main().catch(console.error);
```

## Run tests

```sh
npm test
```

## Maintainers

- **ff6347 <hash@ff6347.email>**

## License

Copyright © 2022 [Technologiestiftung Berlin & Fabian Morón Zirfas](https://github.com/technologiestiftung).<br />
This project is [MIT](https://github.com/technologiestiftung/stadtpuls-test-utils/blob/main/LICENSE) licensed.

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/technologiestiftung/stadtpuls-test-utils/issues). You can also take a look at the [contributing guide](https://github.com/technologiestiftung/stadtpuls/blob/main/CONTRIBUTING.md).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/stadtpuls-test-utils/commits?author=ff6347" title="Code">💻</a> <a href="https://github.com/technologiestiftung/stadtpuls-test-utils/commits?author=ff6347" title="Documentation">📖</a> <a href="#design-ff6347" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/vogelino"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/stadtpuls-test-utils/commits?author=vogelino" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

<table>
  <tr>
    <td>
      <a src="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a src="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a>
    </td>
    <td>
      Supported by: <a src="https://www.berlin.de/rbmskzl/en/">
        <br />
        <br />
        <img width="80" src="https://logos.citylab-berlin.org/logo-berlin-senatskanzelei-en.svg" />
      </a>
    </td>
  </tr>
</table>
