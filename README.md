# movies_api_node

A simple example REST API example implemented with Node.js/Fastify and Postgres using [OMDB API data](https://www.omdbapi.com/)

## How this Project was set up

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

## Resources

* [Recommended Node TSConfig settings](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)
* [knex.js - SQL Query Builder](https://github.com/knex/knex)
