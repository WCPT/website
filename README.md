# WCPT Website

This documents important details of the repository to facilitate the onboarding of new developers to the project.

## Directory structure

`apps` directory in the project root directory contains the 2 applications that work together to power the website:

- `cms` is the content management system
- `web` is the website that users interact with on the browser when they visit the URL

Each app in their respective directories contain their own set of dependencies and source code.

## Development setup

> Note that although this is a monorepo, we do not have any monorepo management tools at the moment. This is because the CMS framework ([Keystone.js](https://keystonejs.com/)) currently has issues with monorepo tooling. This is okay because the project is relatively simple. The framework will hopefully support monorepo tooling in the near future.

The applications within this project uses npm as its package manager. Since this project has no monorepo tooling, you will need to manually `cd` into each application directory and run `npm install`.

Once you've installed the application dependencies with npm, you can run `npm run dev` while inside the directory of the app you want to run in development mode.

## Application Stack

...TODO

## Deployment

...TODO
