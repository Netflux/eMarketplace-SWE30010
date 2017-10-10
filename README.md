# eMarketplace SWE30010
eMarketplace powered by Angular 1 and NodeJS.

### Table of Contents
* [Installation](#installation)
* [Commands](#commands)
* [Configuration](#configuration)
* [License](#license)

## Installation
1. Clone the repository using `git clone https://github.com/Netflux/eMarketplace-SWE30010.git`.
2. Install NPM dependencies using `npm install`.
3. Compile the client/server files using `npm run build`.
4. Run database migrations using `npm run migrate`. Optionally, seed the database using `npm run seed`.
5. Start the server using `npm start`. The default port is 3000.

## Commands
| Command           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `npm run clean`   | Clean up all compiled/compressed files (build and static folders) |
| `npm run lint`    | Run code linting (uses ESLint)                                    |
| `npm run watch`   | Watch code and automatically rebuild on change                    |
| `npm run migrate` | Run the database migrations                                       |
| `npm run seed`    | Run the database seeds                                            |
| `npm run build`   | Build client/server bundles                                       |
| `npm run start`   | Run the server                                                    |

The `migrate`, `seed`, `build` and `start` commands can be appended with `-dev` to run in development mode:
* `npm run migrate-dev`
* `npm run seed-dev`
* `npm run build-dev`
* `npm run start-dev`

## Configuration
Environment variables can be provided when starting the server with `npm run start-dev` / `npm run start`.

| Environment Variable | Default | Description                              |
| -------------------- | ------- | ---------------------------------------- |
| `PORT`               | `3000`  | Port used by the server to serve content |

Database configuration is located in `knexfile.js`. Modify the connection settings to suit your database setup.

## License
Copyright (C) 2017

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
