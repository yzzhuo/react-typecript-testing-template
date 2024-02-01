# Delivery Fee Calculator
This is a simple React application made with TypeScript, unit testing with Jest and E2E testing with Cypress, so it could be used as a template for a React.js+Typescript+Jest+Cypress starter project.

The demo is for calculating the delivery fee based on different input details like cart value, delivery distance, number of items and order time.

## Prerequisites
Before starting to run the program, ensure you have installed:

- Node.js version 18+ (Avoid using [v20.6.0](https://github.com/vitejs/vite/issues/14299))
- npm (which comes with Node.js)

## Installation
Follow these guidelines to install the application dependencies:
``` bash
npm install
```

## Running the Program
You can now start the application:
```bash
npm run start
```
This will start the development server on localhost, port 3000 (http://localhost:3000/).


## Running Tests
This application is equipped with unit tests using Jest and end-to-end tests through Cypress.
To run the unit tests:
```
npm run test
```

To run the end-to-end tests:
```
npm run e2e
```

## Building the Program
To produce the built version of the application, run:
```
npm run build
```

## Linting
This project uses ESLint for maintaining code quality. To lint your code, use:
```
npm run lint
```

## General Information
This project utilizes the following key technologies:
React: A library for building user interfaces
TypeScript: An open-source language which builds on JavaScript
Jest: A delightful JavaScript Testing Framework with a focus on simplicity
Cypress: An end-to-end testing framework
Tailwindcss: A utility-first CSS framework
Vite: A build tool that aims to provide a faster and leaner development experience

## Other
1. if the browser shows error `[plugin:vite:react-babel] Cannot redefine property: File`. Please check the Node.js version (vite:react-babel have this problem with v20.6.0): https://github.com/vitejs/vite/issues/14299