# movies_api_node

A simple REST API example implemented with Node.js/Fastify and Postgres using [OMDB API data](https://www.omdbapi.com/)

## How this project was set up

```sh
# Check Node version - installed with nvm
node --version
# v20.10.0

# Create npm package
npm init -y

# Install TypeScript
npm install --development typescript @types/node

# Generate tsconfig.json
npx tsc --init
# Edit tsconfig.json to use:
# {
#   "compilerOptions": {
#     "lib": ["ES2023"],
#     "module": "node16",
#     "target": "ES2022"
#     "outDir": "dist/",
#   },
#   "include": ["src/**/*"]
# }

# Install nodemon and ts-node for development
npm install --development nodemon ts-node

# Add scripts to package.json:
# "build": "tsc",
# "start": "node dist/index.js",
# "dev": "nodemon src/index.ts",
# "postinstall": "npm run build"
# Create a Hello World src/index.ts file and try the scripts above

# Add to git
git init
# Add .gitignore file with dist and node_modules
# Push to github at https://github.com/peter/movies_api_node
```

Web framework:

```sh
# Install Fastify
npm install fastify
# Create basic server in src/index.ts
```

Database support:

```sh
# Add ORM
npm install typeorm
npm install reflect-metadata
npm install pg
# Uncomment in tsconfig.json:
# "emitDecoratorMetadata": true,
# "experimentalDecorators": true,
# "strictPropertyInitialization": false

# Generate sample database code
npx typeorm init --name MyProject --database postgres
mv MoviesApi/src/entity src 
mv MoviesApi/src/migration src
mv MoviesApi/src/data-source.ts src 
mv MoviesApi/src/index.ts src/db-test.ts
rm -r MoviesApi
# Edit db files to fit your application

# Create postgres database
createdb -U postgres movies-api-node

# Check database data
psql -U postgres movies-api-node
```

## Resources

* [Recommended Node TSConfig settings](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)
* [How to set up TypeScript with Node.js and Express](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
* [Fastify/TypeScript Getting Started](https://fastify.dev/docs/latest/Reference/TypeScript/)
* [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [Choosing a database solution and ORM for Node.js](https://medium.com/@aabedraba/choosing-a-database-solution-and-orm-for-node-js-6c256ced72ff)
* [How to Build a Nest.js CRUD REST API Using TypeORM and PostgreSQL](https://www.makeuseof.com/nestjs-crud-rest-api-typeorm-postgresql/)
