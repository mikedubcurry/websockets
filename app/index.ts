import dotenv from 'dotenv'
dotenv.config();

import { httpServer } from './server';
import { users } from './schema/users';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";


async function main() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'root',
        database: "websocket",
    });

    const db = drizzle(connection);

    db.select().from(users).then(data => {
        console.log(data)
    })

    const port = process.env.PORT || 3000;

    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}


main().catch(console.error)
