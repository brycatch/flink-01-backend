# Flink / Technical test

Repository for backend project with Node.js

## Getting Started

### Requirements
- node v12.x
- npm 6.x
- Mongo: 4.x
- Linux Server 20.x

### Component's anatomy
#### 📂 Folders:
- coverage: generated automatically by npm run test:coverage command
- build: generated automatically by npm run build command
- public: folder to show public static files
- src: contains the root files of the project
- tests: contains all the testing files about the components

#### 📄 Files:
- .env | .env.prod: used to save enviroment variables used in components
- babel.config.js: configuration to use babel with typescript
- jest.config.js: configuration to use jest with typescript and files with `.spec` in their names and save them into `tests` folder
- tsconfig.json: configuration of typescript 

### Installation
1. Clone this repository
2. Select any endpoint.
3. `npm install` to install dependencies.
4. `npm run build` to create `dist` folder.
5. `npm run start:dev` to run development environment.
6. `npm run start` to run development environment.
7. `npm run build`  to export to production.

## 📕License
The (MIT) [Lincense](LICENSE)
