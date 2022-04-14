# wallyball

## Running the App

This project uses [Vite](https://vitejs.dev/) for building, HMR, and the dev server. The final product is packaged using [Electron](https://www.electronjs.org/).

Steps to run the app:

1. Install project dependencies with `npm install`
1. Run `npm start`
1. Once the project builds, it will be available at http://localhost:3000

## Available Scripts

|Command|Description|
|----------|----------|
|`npm start`| start the Vite dev server (app will run on localhost:3000) |
|`npm run electron:dev`| start a dev version of the Electron app (must have Vite server running on localhost:3000) |
| `npm run electron:release` | build the Electron executable (see `release` folder for output) |
|`npm test`| run all unit tests |
|`npm run lint`| run linter for entire project|
