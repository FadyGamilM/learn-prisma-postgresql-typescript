# learn-prisma-postgresql-typescript
## `How To Bootstrap the application with prisme ?` 
#### 1. Setup a postgres database using docker

```cmd
➜ docker run -d --name prismadb -e POSTGRES_USER=fady -e POSTGRES_PASSWORD=fady -e POSTGRES_DB=db -p 2023:5432 postgres:14
```

#### 2. Setup the dependencies for the application
```cmd
➜ npm init -y 
➜ npm i -D --save prisma typescript  ts-node @types/node
```

#### 3. Add the script to monitor any changes in the src folder
- create the src folder in the root directory and then create a file called `server.ts` which is the entry point of our api.
- inside the `package.json` file add this under the `scripts` section
```cmd
➜ {"dev" : "ts-node-dev --respawn --transpile-only src/server.ts"}
```

#### 4. Setup the tsconfig.json file
- create a file named `tsconfig.json` using this command :
```cmd
➜ npx tsc --init
```

#### 5. initialize Prisma
- setup prisma with psotgresql as a data provider
```cmd
➜ npx prisma init --datasource-provider postgresql
```

#### 6. Run your migrations after updating the `schema.prisma` file
```cmd
➜ npx prisma migrate dev --name [migration-name]
```


#### 7. install Prisma client library
```cmd
➜ npm i @prisma/client
```

#### 7. generate a new client instance after each migration is quite good !
```cmd
➜ npx prisma generate
```
---

## `How To Work With Prisma Models ?` 

#### 1. Modeling 1-N relationship:
- `scenario`
➜ user can write one or more posts 
➜ a post belongs to only one user (author)
➜ user can mark some posts as a favourite posts (fav list)
- `db-modeling`
```ts
model User {
  // the pk of the user entity
  id              Int    @id @default(autoincrement())
  // each user has an email
  email           String
  // a user can keep list of all his/her own posts
  authorizedPosts Post[] @relation("authorized")

  // a user can keep list of all his/her favourite posts   
  favPosts Post[] @relation("favourited")
}

model Post {
  // the pk of the post entity
  id Int @id @default(autoincrement())

  // content of the post
  content String

  // each post can be authorized by only one author [1-user can write N-posts] ➜ Put the id of the 1-side as a fk into the N-side
  author   User @relation("authorized", fields: [authorId], references: [id])
  authorId Int

  // each post can be marked as a fav post for an author, and can not be fav, it can be just a normal post
  favouriteFor User? @relation("favourited", fields: [favForId], references: [id])
  favForId     Int?
}
```


#### 2. Modeling N-M relationship:
- `scenario`
➜ a post can be categorized under one or different than one category
➜ a category can include one or more than one post
- `db-modeling`
```ts
model Post {
  // the pk of the post entity
  id Int @id @default(autoincrement())

  // content of the post
  content String

  // each post can be authorized by only one author [1-user can write N-posts] ➜ Put the id of the 1-side as a fk into the N-side
  author   User @relation("authorized", fields: [authorId], references: [id])
  authorId Int

  // each post can be marked as a fav post for an author, and can not be fav, it can be just a normal post
  favouriteFor User? @relation("favourited", fields: [favForId], references: [id])
  favForId     Int?

  // list of one or more category this post is categorized under it/them
  Categories Category[]
}

model Category {
  // pk of the category entity
  id Int @id @default(autoincrement())

  // list of one or more posts
  posts Post[]
}
```

#### 3. Modeling 1-1 relationship:
- `scenario`
➜ user can select one preference
➜ a preferennce is related to only one user
```ts
model User {
  // the pk of the user entity
  id              Int    @id @default(autoincrement())
  // each user has an email
  email           String
  // a user can keep list of all his/her own posts
  authorizedPosts Post[] @relation("authorized")

  // a user can keep list of all his/her favourite posts   
  favPosts Post[] @relation("favourited")

  // a user can only have zero or 1 preference
  preference UserPreference?
}
model UserPreference {
  id                     Int     @id @default(autoincrement())
  // a preference selection is related to one user
  ReceiveEmailForUpdates Boolean
  user                   User    @relation(fields: [userId], references: [id])
  userId                 Int     @unique // unique because we must have only one user that selects this specific preference for his/her account
}
```

---
## `model-attributes vs Block-level-atrribute ?` 
#### Block-Level-Atribute:
- its written inside the {} of the model object, but not on specific field
- its marked by `@@` not only `@`
`scenario [1]` ➜ no two users have the same combination of first_name and last_name 
`modeling`
```ts
model User {
   first_name String 
   last_name String

   @@unique([first_name, last_name]) // unique constraint
}
```
`scenario [2]` ➜ when you need to optimize the searching on specific field rather than the id [pk]
```ts
model User {
   email String
   ..
   ..
   @@index([email]) // we can put index on ore than one field
}
```

`scenario [3]` ➜ when you need to have compund PK
```ts
model User {
   email String
   age String
   @@id([email, age]) 
}
```
---
## `Enums .. `
```ts
model User {
  // the pk of the user entity
  id              Int    @id @default(autoincrement())
  // each user has an email
  email           String
  // a user can keep list of all his/her own posts
  authorizedPosts Post[] @relation("authorized")

  // a user can keep list of all his/her favourite posts   
  favPosts Post[] @relation("favourited")

  // a user can only have zero or 1 preference
  preference UserPreference?

  // give the user a role 
  role Role @default(Basic)
}

enum Role {
  Basic
  Admin
  Sponser
}
```
