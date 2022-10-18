# WCPT Website

This documents important details of the repository to facilitate the onboarding of new developers to the project.

## Directory structure

`apps` directory in the project root directory contains the 2 applications that work together to power the website:

- `cms` is the content management system
- `web` is the website that users interact with on the browser when they visit the URL

Each app in their respective directories contain their own set of dependencies and source code.

## Development setup

The development setup is very straight-forward and simple. Once you have met the prerequisites, follow the instructions to get started.

### Prerequisites

- [node](https://nodejs.org/) `^16` - Node.js, the JS runtime
- npm `^8.5` - default package manager that gets installed together with node
- [Docker](https://www.docker.com/) `^20.10` - optional, but highly recommended

> The `^` symbol indicates that you must at minimum have these versions.

### Instructions

> Note that although this is a monorepo, we do not have any monorepo management tools at the moment. This is because the CMS framework ([Keystone.js](https://keystonejs.com/)) currently has issues with monorepo tooling. This is okay because the project is relatively simple. The framework will hopefully support monorepo tooling in the near future.

The applications within this project uses npm as its package manager. Since this project has no monorepo tooling, you will need to manually `cd` into each application directory and run `npm install`.

Once you've installed the application dependencies with npm, you can run `npm run dev` while inside the directory of the app you want to run in development mode.

> Before you run the `cms` application, you first need to run a MySQL instance. If you have docker installed, run `docker-compose up -d` from the project root. This will automatically pull the MySQL 8 docker image from the docker registry and run it within an isolated container that you can access on port 3306. When you want to stop the MySQL instance, run `docker-compose down` from the project root.

## Application Stack

...TODO

## Deployment

...TODO
