# learn-prisma-postgresql-typescript

### 1. Setup a postgres database using docker

```cmd
➜ docker run -d --name prismadb -e POSTGRES_USER=fady -e POSTGRES_PASSWORD=fady -e POSTGRES_DB=db -p 2023:5432 postgres:14
```

### 2. Setup the dependencies for the application
```cmd
➜ npm init -y 
➜ npm i -D --save prisma typescript  ts-node @types/node
```

### 3. Add the script to monitor any changes in the src folder
- create the src folder in the root directory and then create a file called `server.ts` which is the entry point of our api.
- inside the `package.json` file add this under the `scripts` section
```cmd
➜ {"dev" : "ts-node-dev --respawn --transpile-only src/server.ts"}
```

### 4. Setup the tsconfig.json file
- create a file named `tsconfig.json` using this command :
```cmd
➜ npx tsc --init
```

### 5. initialize Prisma
- setup prisma with psotgresql as a data provider
```cmd
➜ npx prisma init --datasource-provider postgresql
```

