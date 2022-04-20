```
npm init -y
```

```
npm i typescript -D
```

```
npm install express
```

```
npm i --save-dev @types/express
```

```
npx tsc --init
```
```
"outDir": "./dist", 
```
```
"rootDir": "./src",     
```

```
npx tsc
```

```
node dist/server.js
```
```
http://localhost:3333/
```

```
npm install ts-node-dev -D
```

```
npm run dev
```

```
npm install knex@^0.95.15
```

```
npm install sqlite3
```

```
npx knex --knexfile knexfile.ts migrate:latest
```
```
npm run knex:migrate
```

```
npx knex --knexfile knexfile.ts seed:run
```
```
npm run knex:seed
```

```
npm i cors && npm i @types/cors
```

```js
app.use(cors({
    origin: ['dominio.com.br', 'https://github.com/lucasrmagalhaes']
}));
```

```
npm i multer
```

```
npm i @types/multer -D
```

```
npm i celebrate
```

```
npm i bcryptjs
```

```
npm i --save-dev @types/bcryptjs -D
```

```
npm i jsonwebtoken
```

```
npm i --save-dev @types/jsonwebtoken -D
```

```
npm install pm2@latest -g
```

```
npm run build
```

```
cd dist/src/
```

```
pm2 start server.js
```

```
pm2 restart server.js
```

```
pm2 reload server.js
```

```
pm2 stop server.js
```

```
pm2 delete server.js
```

```
pm2 monit
```

```
pm2 logs
```

```
pm2 plus
```

- Node.js - Porta em uso. CMD - ADM: ```C:\Windows\System32>```
```
taskkill /F /IM node.exe
```